export class Db {
  db: any;

  constructor() {
    this.db = (data: any) => console.log(data, `pozdro z bazy`);
  }
}

export const db = new Db();
