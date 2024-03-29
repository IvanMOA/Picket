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
describe("Register administrator", () => {
  const app = Server.bootstrap();
  const req = () => _request(app);
  it("Registers an administrator if one with its email does not exists yet", async () => {
    const password = faker.internet.password();
    const a = await k("dependencies").insert(
      {
        dependency_id: "23161",
        name: "Superadmins dependency",
      },
      ["id"]
    );
    const res = await req().post("/v1/administrators").send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: password,
      confirmation_password: password,
      role: Role.ADMIN,
      dependency_id: a[0].id,
    });
    expect(res.status).toBe(201);
    expect(res.body.administrator.id).toBeDefined();
  });
  it("Validates its input", async () => {
    const res = await req().post("/v1/administrators").send({
      name: "",
      email: "",
      password: "",
      confirmation_password: "",
      role: "",
      dependency_id: "",
    });
    expect(res.status).toBe(422);
    const errors = res.body.errors;
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.role).toBeDefined();
    expect(errors.confirmation_password).toBeDefined();
  });
});
