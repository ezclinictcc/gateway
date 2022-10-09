import { IRouter } from "express";
import { HttpMethods } from "../../presentation/interfaces/http-request";
import { IBaseController } from "../../presentation/interfaces/base-controller";
import { IBaseConnection } from "../../usecases/repository/interfaces/IBaseConnection";
import { CommonEntity } from "../../entities/common/CommonEntity";

export interface IAppRoute {
  getRouter(): IRouter;
  useRoute(path: string, route: IRouter): void;
  createRoute(
    method: HttpMethods,
    path: string,
    controller: IBaseController<CommonEntity, IBaseConnection>
  ): void;
}
