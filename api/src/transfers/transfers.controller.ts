import { Application, Request, Response } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { AddTransferDto, TransferWithUsersModel } from "./transfers.model";
import { transfersService } from "./transfers.service";

export const registerTransfersRoutes = (app: Application) => {
  app.get(
    "/transfers",
    async (
      req: Request,
      res: Response<{ transfers: TransferWithUsersModel[] }>
    ) => {
      try {
        const transfers = await transfersService.getAllTransfersWithUsers();

        ResponseHandler.handleSuccess(res, { transfers: transfers.rows });
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );

  app.post(
    "/transfers",
    async (req: Request<any, any, AddTransferDto>, res: Response) => {
      try {
        await transfersService.addTransfer(req.body);

        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );
};
