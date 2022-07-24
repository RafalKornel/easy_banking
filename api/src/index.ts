import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Add headers before the routes are defined
app.use(corsMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("hello test content from BE");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
