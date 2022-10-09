import { Router as IRouter } from "express-serve-static-core";

export interface IAppConfig {
  setMidleware: (...params: any) => void;
  setPort(port: number | string): void;
  startServer(): void;
  setRoute(routes: IRouter): void;
}
