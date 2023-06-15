import { Application, Request, Response } from "express";
import { ResponseHandler } from "../../utils/response-handler";
import { AddInvoiceDto, InvoiceModel } from "./invoices.model";
import { invoicesService } from "./invoices.service";

export const registerInvoicesRoutes = (app: Application) => {
  app.get(
    "/invoices",
    async (req: Request, res: Response<{ invoices: InvoiceModel[] }>) => {
      try {
        const invoices = await invoicesService.getAllInvoicesWithUsers();

        ResponseHandler.handleSuccess(res, { invoices: invoices.rows });
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );

  app.post(
    "/invoices",
    async (req: Request<any, any, AddInvoiceDto>, res: Response) => {
      try {
        await invoicesService.addInvoice(req.body);

        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );
};
