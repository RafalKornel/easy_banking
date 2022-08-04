import { Request, Response, Application } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { RegisterDto } from "./users.model";
import { loginService } from "./users.service";

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

  app.get("/users", async (req: Request, res: Response) => {
    try {
      const dbRes = await loginService.getUsers();

      ResponseHandler.handleSuccess(res, { users: dbRes.rows });
    } catch (e) {
      ResponseHandler.handleInternalError(res, (e as Error).message);
    }
  });
};
