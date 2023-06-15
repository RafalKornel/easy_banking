import { Application, Request, Response } from "express";
import { ResponseHandler } from "../../utils/response-handler";
import { seederService } from "./seeder.service";

export const registerSeederRoutes = (app: Application) => {
  app.post("/seed", async (req: Request, res: Response) => {
    try {
      await seederService.seedAll();

      ResponseHandler.handleSuccess(res);
    } catch (e) {
      ResponseHandler.handleInternalError(res, (e as Error).message);
    }
  });
};
