import { Server } from "./Server";
const app = Server.bootstrap();
app.listen(4004, () => {
  console.log("Running GraphQL at port 4004");
});
