import { app } from "./app";
import { registerInvoicesRoutes } from "./modules/invoices";
import { registerSeederRoutes } from "./modules/seeder";

import { registerTransfersRoutes } from "./modules/transfers";
import { registerUsersRoutes } from "./modules/users";

registerUsersRoutes(app);
registerTransfersRoutes(app);
registerInvoicesRoutes(app);
registerSeederRoutes(app);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
