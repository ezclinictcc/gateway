import { IRouter, Request, Response, Router } from "express";
import { CommonEntity } from "../../../entities/common/CommonEntity";
import { IAppRoute } from "../../../external/interfaces/IAppRoute";
import { IBaseController } from "../../../presentation/interfaces/base-controller";
import { HttpMethods } from "../../../presentation/interfaces/http-request";
import { LogCriticality } from "../../../presentation/interfaces/log-criticality";
import { IBaseConnection } from "../../../usecases/repository/interfaces/IBaseConnection";
import { IAppLogger } from "../../../usecases/service/interfaces/IAppLogger";

export class ExpressRouteAdapter implements IAppRoute {
  private static INSTANCE: ExpressRouteAdapter;

  private static LOGGER: IAppLogger;

  private router: IRouter;

  public constructor() {
    this.router = Router();
  }

  public static getInstance(logger?: IAppLogger): ExpressRouteAdapter {
    ExpressRouteAdapter.LOGGER = logger;
    ExpressRouteAdapter.INSTANCE = new ExpressRouteAdapter();
    return ExpressRouteAdapter.INSTANCE;
  }

  static getLogger() {
    return this.LOGGER;
  }

  useRoute(path: string, route: IRouter): void {
    this.router.use(path, route);
  }

  getRouter(): IRouter {
    return this.router;
  }

  createRoute(
    method: HttpMethods,
    path: string,
    controller: IBaseController<CommonEntity, IBaseConnection>
  ): void {
    try {
      switch (method) {
        case HttpMethods.POST:
          this.router.post(path, (request: Request, response: Response) => {
            console.log("create");
            const promise: Promise<any> = controller.create({
              body: request.body,
              logger: ExpressRouteAdapter.LOGGER,
            });
            promise
              .then((entity: any) => response.status(200).json(entity[0]))
              .catch((error: any) => {
                this.handleErrors(error, response);
              });
          });
          break;
        case HttpMethods.GET:
          this.router.get(path, (request: Request, response: Response) => {
            const { query } = request;
            const promise = controller.find({
              param: query,
              token: request.headers.authorization.replace("Bearer ", ""),
              logger: ExpressRouteAdapter.LOGGER,
            });
            promise
              .then((entities: any) => response.status(200).json(entities))
              .catch((error: any) => {
                this.handleErrors(error, response);
              });
          });

          break;
        case HttpMethods.PUT:
          this.router.put(path, (request: Request, response: Response) => {
            const promise: Promise<any> = controller.update({
              body: request.body,
              token: request.headers.authorization.replace("Bearer ", ""),
              logger: ExpressRouteAdapter.LOGGER,
            });
            promise
              .then((entity: any) => response.status(200).json(entity[0]))
              .catch((error: any) => {
                this.handleErrors(error, response);
              });
          });
          break;
        case HttpMethods.DELETE:
          this.router.delete(path, (request: Request, response: Response) => {
            const { query } = request;
            const promise: Promise<any> = controller.remove({
              param: query,
              token: request.headers.authorization.replace("Bearer ", ""),
              logger: ExpressRouteAdapter.LOGGER,
            });
            promise
              .then((entity: any) => response.status(200).json(entity[0]))
              .catch((error: any) => {
                this.handleErrors(error, response);
              });
          });

          break;
        default:
          this.router.get(path, (_request: Request, response: Response) => {
            this.handleErrors({ message: "internal_server_error" }, response);
          });
      }
    } catch (error: any) {
      ExpressRouteAdapter.LOGGER.showLog(LogCriticality.ERROR, error.message);
    }
  }

  handleErrors(errorMessage: any, response: Response) {
    switch (errorMessage.message) {
      case "login_not_found":
        response
          .status(401)
          .json({ errorDescription: "invalid_user_or_password" });
        break;
      default:
        response
          .status(500)
          .json({ errorDescription: "internal_server_error" });
    }
  }
}
