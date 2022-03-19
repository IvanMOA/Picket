import _request from "supertest";
import * as faker from "faker";
import { Server } from "../src/app/Server";
import { EnvironmentArranger } from "../src/shared/infrastructure/environment-arranger/EnvironmentArranger";
import { k } from "../src/shared/infrastructure/clients/Knex";
import { Role } from "../src/modules/users/domain/Role";
beforeEach(async () => {
  await EnvironmentArranger.cleanUp();
});
afterAll(async () => {
  await EnvironmentArranger.disconnect();
});
describe("Delete administrator", () => {
  const app = Server.bootstrap();
  const req = () => _request(app);
  it("Deletes an administrator if it exists", async () => {
    const password = faker.internet.password();
    const a = await k("dependencies").insert(
      {
        dependency_id: "23161",
        name: "Superadmins dependency",
      },
      ["id"]
    );
    const postRes = await req().post("/v1/administrators").send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: password,
      confirmation_password: password,
      role: Role.ADMIN,
      dependency_id: a[0].id,
    });

    const deleteRes = await req().delete(
      `/v1/administrators/${postRes.body.administrator.id}`
    );
    expect(deleteRes.status).toBe(200);
  });
});
