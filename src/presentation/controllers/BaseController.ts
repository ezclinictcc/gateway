import { CommonEntity } from "../../entities/common/CommonEntity";
import { IBaseConnection } from "../../usecases/repository/interfaces/IBaseConnection";
import { IBaseController } from "../interfaces/base-controller";
import { IHttpRequest, IHttpResponse } from "../interfaces/http-request";

export class BaseController<T extends CommonEntity, R extends IBaseConnection>
  implements IBaseController<T, R>
{
  // badRequest: (errorMessage: string) => IHttpResponse;

  // success: (errorMessage: string) => IHttpResponse;

  // serverError: (errorMessage: string) => IHttpResponse;

  create: ({ body }: IHttpRequest) => Promise<T>;

  remove: ({ param }: IHttpRequest) => Promise<T>;

  update: (httpRequest: IHttpRequest) => Promise<T>;

  find: (httpRequest: IHttpRequest) => Promise<T[]>;

  t: () => void;

  // keepalive = () => this.success("OK");

  badRequest = (message: string): IHttpResponse => ({
    statusCode: 400,
    body: { message },
  });

  success = (data: any): IHttpResponse => ({
    statusCode: 200,
    body: data,
  });

  serverError = (message: string): IHttpResponse => ({
    statusCode: 500,
    body: { message },
  });
}
