import { IHttpRequest, IHttpResponse } from "../http-request";

export interface IBaseController<T, R> {
  // findAll: () => Promise<any[]>;

  // findByName: (name: string) => Promise<any[]>;
  create: ({ body, logger }: IHttpRequest) => Promise<T>;
  // exists: (id: string) => Promise<boolean>;
  remove: ({ param, logger }: IHttpRequest) => Promise<T>;
  update: ({ body, logger }: IHttpRequest) => Promise<T>;
  find: ({ body, logger }: IHttpRequest) => Promise<T[]>;

  badRequest: (errorMessage: string) => IHttpResponse;
  success: (errorMessage: string) => IHttpResponse;
  serverError: (errorMessage: string) => IHttpResponse;
}
