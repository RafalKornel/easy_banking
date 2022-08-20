import { QueryResult } from "pg";

export const getNextId = <T extends { id: number }>(
  entities: QueryResult<T>
) => {
  const ids = entities.rows.map(({ id }) => id);

  const highestId = !!ids.length ? Math.max(...ids) : 0;
  const newId = highestId + 1;

  return newId;
};
