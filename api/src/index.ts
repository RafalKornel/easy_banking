import { app } from "./app";

import { registerLoginRoutes } from "./login/login.controller";

const port = process.env.PORT || 8000;

console.log(typeof registerLoginRoutes);

registerLoginRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
