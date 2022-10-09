import { getRepositoryAdapter } from "../../../adapters";
import { ExpressRouteAdapter } from "../../../adapters/external/express/ExpressRouteAdapter";
import { WinsonLoggerAdapter } from "../../../adapters/external/winson/WinsonAdapter";
import LoginController from "../../../presentation/controllers/LoginController";
import { HttpMethods } from "../../../presentation/interfaces/http-request";
import { IAppRoute } from "../../interfaces/IAppRoute";

const logger = WinsonLoggerAdapter.getInstance();
const logoutRoute: IAppRoute = ExpressRouteAdapter.getInstance(logger);
logoutRoute.createRoute(
  HttpMethods.DELETE,
  "/",
  new LoginController(getRepositoryAdapter())
);

export default logoutRoute;
