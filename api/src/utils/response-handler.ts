import { Response as ExpressResponse } from "express";

interface Response<TData = {}, TError = {}> {
  data?: TData;
  error?: TError;
  status: number;
}

export class ResponseHandler {
  static handleSuccess<TData>(res: ExpressResponse, data?: TData) {
    const response: Response<TData> = { data, status: 200 };

    res.status(200).send(response);
  }

  static handleInternalError(res: ExpressResponse, errorMessage: string) {
    const response: Response<null, string> = {
      error: errorMessage,
      status: 500,
    };

    res.status(500).send(response);
  }
}
