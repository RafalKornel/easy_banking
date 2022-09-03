import { app } from "./app";
import { registerTransfersRoutes } from "./transfers/transfers.controller";

import { registerLoginRoutes } from "./users";

const port = process.env.PORT || 8000;

console.log(typeof registerLoginRoutes);

registerLoginRoutes(app);
registerTransfersRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
