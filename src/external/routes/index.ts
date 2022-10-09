import { ExpressRouteAdapter } from "../../adapters/external/express/ExpressRouteAdapter";
import { WinsonLoggerAdapter } from "../../adapters/external/winson/WinsonAdapter";
import { IAppRoute } from "../interfaces/IAppRoute";
import credentialRoute from "./credential-routes";
import loginRoute from "./login-routes";
import logoutRoute from "./logout-routes";

const service = "gateway-service";
const logger = WinsonLoggerAdapter.getInstance();
const route: IAppRoute = ExpressRouteAdapter.getInstance(logger);
route.useRoute(`/${service}/login`, loginRoute.getRouter());
route.useRoute(`/${service}/logout`, logoutRoute.getRouter());
route.useRoute(`/${service}/credentials`, credentialRoute.getRouter());

export default route;
