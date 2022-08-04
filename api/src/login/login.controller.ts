import { Request, Response, Application } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { RegisterDto } from "./login.model";
import { loginService } from "./login.service";

export const registerLoginRoutes = (app: Application) => {
  app.post(
    "/register",
    async (req: Request<any, any, RegisterDto>, res: Response) => {
      try {
        await loginService.registerUser(req.body);
        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );
};
