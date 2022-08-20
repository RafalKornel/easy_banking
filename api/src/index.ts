import { app } from "./app";
import { registerTransactionRoutes } from "./transactions/transactions.controller";

import { registerLoginRoutes } from "./users";

const port = process.env.PORT || 8000;

console.log(typeof registerLoginRoutes);

registerLoginRoutes(app);
registerTransactionRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
