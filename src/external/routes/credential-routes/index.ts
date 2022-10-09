import { getRepositoryAdapter } from "../../../adapters";
import { ExpressRouteAdapter } from "../../../adapters/external/express/ExpressRouteAdapter";
import { WinsonLoggerAdapter } from "../../../adapters/external/winson/WinsonAdapter";
import CredentialController from "../../../presentation/controllers/CredentialController";
import { HttpMethods } from "../../../presentation/interfaces/http-request";
import { IAppRoute } from "../../interfaces/IAppRoute";

const logger = WinsonLoggerAdapter.getInstance();
const credentialRoute: IAppRoute = ExpressRouteAdapter.getInstance(logger);
credentialRoute.createRoute(
  HttpMethods.GET,
  "/",
  new CredentialController(getRepositoryAdapter())
);
credentialRoute.createRoute(
  HttpMethods.POST,
  "/",
  new CredentialController(getRepositoryAdapter())
);
credentialRoute.createRoute(
  HttpMethods.PUT,
  "/",
  new CredentialController(getRepositoryAdapter())
);
credentialRoute.createRoute(
  HttpMethods.DELETE,
  "/",
  new CredentialController(getRepositoryAdapter())
);

export default credentialRoute;
