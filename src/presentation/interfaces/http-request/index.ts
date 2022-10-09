import { IAppLogger } from "../../../usecases/service/interfaces/IAppLogger";

// eslint-disable-next-line no-shadow
export enum HttpMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

export interface IHttpRequest {
  body?: any;
  param?: any;
  token?: string;
  logger?: IAppLogger;
}
