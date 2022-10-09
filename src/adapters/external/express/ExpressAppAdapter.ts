import express, { Router } from "express";
import { Express, Router as IRouter } from "express-serve-static-core";
import { IAppConfig } from "../../../external/interfaces/IAppConfig";

class ExpressAppConfig implements IAppConfig {
  private static INSTANCE: ExpressAppConfig;

  private port: number;

  private app: Express;

  private defaultPort: number = 8080;

  private serverStartMessage: string;

  private routes: IRouter;

  public constructor() {
    this.app = express();
    this.port = this.defaultPort;
    this.routes = Router();
    this.setMidleware(express.json());
    this.serverStartMessage = `
    ===================
    SERVER STARTED!
    ===================

    PORT:${this.port}
    `;
  }

  public static getInstance(): ExpressAppConfig {
    if (!ExpressAppConfig.INSTANCE) {
      ExpressAppConfig.INSTANCE = new ExpressAppConfig();
    }
    return ExpressAppConfig.INSTANCE;
  }

  setMidleware(...params: any): void {
    this.app.use(...params);
  }

  setPort(port: number): void {
    this.port = port;
  }

  startServer(): void {
    this.app.use(this.routes);
    this.app.listen(this.port);
    console.log(this.serverStartMessage);
  }

  setRoute(routes: IRouter): void {
    this.routes.use(routes);
  }
}

export default ExpressAppConfig;
