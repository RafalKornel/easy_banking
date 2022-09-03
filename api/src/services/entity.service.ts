import { QueryResult } from "pg";
import { Db } from "./db.service";

export abstract class EntityService {
  protected readonly db: Db;

  abstract create(): Promise<QueryResult<any>>;
  abstract drop(): Promise<QueryResult<any>>;

  constructor(db: Db) {
    this.db = db;
  }
}
