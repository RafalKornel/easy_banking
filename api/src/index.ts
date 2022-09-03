import { app } from "./app";
import { registerInvoicesRoutes } from "./invoices";
import { registerSeederRoutes } from "./seeder";

import { registerTransfersRoutes } from "./transfers";
import { registerUsersRoutes } from "./users";

registerUsersRoutes(app);
registerTransfersRoutes(app);
registerInvoicesRoutes(app);
registerSeederRoutes(app);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
