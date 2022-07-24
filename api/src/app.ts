import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { corsMiddleware } from "./middleware/cors";

const createApp = () => {
  dotenv.config();

  const app: Express = express();

  // Add headers before the routes are defined
  app.use(corsMiddleware);

  app.use(bodyParser.json());

  return app;
};

export const app = createApp();
