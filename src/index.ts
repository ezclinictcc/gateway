import dotenv from "dotenv";
import httpProxy from "express-http-proxy";
import swaggerUi from "swagger-ui-express";
import { decode } from "jsonwebtoken";
import { getRepositoryAdapter } from "./adapters";
import corsAdapter from "./adapters/external/cors";
import ExpressAppConfig from "./adapters/external/express/ExpressAppAdapter";
import { ExpressRouteAdapter } from "./adapters/external/express/ExpressRouteAdapter";
import { IAppConfig } from "./external/interfaces/IAppConfig";
import routes from "./external/routes";
import CredentialController from "./presentation/controllers/CredentialController";
import LoginController from "./presentation/controllers/LoginController";
import swaggerFile from "./swagger.json";

function selectProxyHost(req) {
  if (req.path.includes("/identity-service/")) {
    return "https://identityservice1.herokuapp.com";
  }
  return null;
}

dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});

const orm = getRepositoryAdapter();
orm.createConnection();

const app: IAppConfig = ExpressAppConfig.getInstance();
app.setMidleware(corsAdapter);
app.setMidleware("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.setMidleware(async (req, res, next) => {
  let hasPermissionToAccess = false;

  const needAuth =
    !req.path.includes("/login") &&
    !req.path.includes("/user") &&
    req.method === "POST";

  const host = selectProxyHost(req);
  const loginController = new LoginController(getRepositoryAdapter());

  if (needAuth) {
    if (req.headers.authorization) {
      await loginController
        .find({
          param: {
            token: req.headers.authorization.replace("Bearer ", ""),
          },
          logger: ExpressRouteAdapter.getLogger(),
        })
        .then((response) => {
          if (response && response.length === 1) {
            hasPermissionToAccess = true;
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(403).json({ errorDescription: "access_denied" });
        });
    }
  } else {
    hasPermissionToAccess = true;
  }
  if (req.method === "POST" && req.path.includes("/user")) {
    const credentialController = new CredentialController(
      getRepositoryAdapter()
    );

    await credentialController
      .create({
        body: {
          login: req.body.email,
          password: req.body.password,
        },
        logger: ExpressRouteAdapter.getLogger(),
      })
      .then((response) => {
        req.body.id = response.pop().id;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorDescription: "internal_server_error" });
      });
  }

  if (hasPermissionToAccess) {
    if (host) {
      await httpProxy(selectProxyHost(req))(req, res, next);
    } else {
      next();
    }
  } else {
    res.status(403).json({ errorDescription: "access_denied" });
  }
});
app.setPort(process.env.APP_PORT || 8000);
app.setRoute(routes.getRouter());
app.startServer();

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("-------------------------------------------------------");
  console.log(err);
  console.log("-------------------------------------------------------");
});
