import { db } from "../../db";
import { BaseRepository } from "../../services";
import { getNextId } from "../../utils/getNextId";
import { UserModel } from "./users.model";

class UsersRepository extends BaseRepository {
  async create() {
    const CREATE_USERS_SQL = `
    CREATE TABLE users (
      id INT PRIMARY KEY,
      username VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      balance INT NOT NULL
    )`;

    return await this.db.query(CREATE_USERS_SQL, []);
  }

  async drop() {
    const DROP_USERS_SQL = "DROP TABLE IF EXISTS users CASCADE";

    return await this.db.query(DROP_USERS_SQL, []);
  }

  async registerUser(
    username: string,
    password: string,
    startingBalance: number,
    hardId?: number
  ) {
    const existingUsers = await this.getUsers();

    const newUserId = hardId || getNextId(existingUsers);

    return await this.db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [
      newUserId,
      username,
      password,
      startingBalance,
    ]);
  }

  async getUsers() {
    return this.db.query<UserModel, any>("SELECT * FROM users", []);
  }

  async getUser(userId: number) {
    return await this.db.query<UserModel, any>(
      "SELECT * \
        FROM users \
        WHERE users.id = $1 ",
      [userId]
    );
  }

  async updateBalance(userId: number, newBalance: number) {
    await this.db.query<UserModel, any>(
      "UPDATE users SET balance = $1 WHERE id = $2;",
      [newBalance, userId]
    );
  }
}

export const usersRepository = new UsersRepository(db);

export type { UsersRepository as UsersRepository };
