import { Request, Response, Application } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { LoginDto, LoginModel } from "./login.model";
import { loginService } from "./login.service";

export const registerLoginRoutes = (app: Application) => {
  app.post(
    "/login",
    async (req: Request<any, any, LoginDto>, res: Response) => {
      const { password, repeatPassword, username } = req.body;

      try {
        const loginData = new LoginModel({
          username,
          password,
          repeatPassword,
        });

        await loginService.createUser(loginData);

        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, `Error: ${e}`);
      }
    }
  );
};
