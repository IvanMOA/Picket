import { Server } from "./Server";
const app = Server.create();
app.listen(4004, () => {
  console.log("Running GraphQL at port 4004");
});
