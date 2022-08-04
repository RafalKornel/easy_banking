import { Pool, QueryResult } from "pg";

const credentials = {
  host: process.env.DB_HOST || "",
  user: process.env.DB_CONNECTION_USER || "",
  password: process.env.DB_CONNECTION_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: Number(process.env.DB_PORT) || 0,
};

export class Db {
  private readonly pool: Pool;
  db: any;

  constructor() {
    this.pool = new Pool(credentials);
  }

  query<TResult, TParams extends any[]>(text: string, params: TParams) {
    return this.pool.query<TResult, TParams>(text, params);
  }
}
