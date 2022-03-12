import _request from "supertest";
import { EnvironmentArranger } from "../../../../shared/infrastructure/environment-arranger/EnvironmentArranger";
import { Server } from "../../../../app/Server";
import * as faker from "faker";
import { Role } from "../../../users/domain/Role";
import { k } from "../../../../shared/infrastructure/clients/Knex";
beforeEach(async () => {
  await EnvironmentArranger.cleanUp();
});
afterAll(async () => {
  await EnvironmentArranger.disconnect();
});
describe("Register administrator", () => {
  const app = Server.create();
  const req = () => _request(app);
  const query = `
            mutation ($input: RegisterAdministratorInput!){
                registerAdministrator(input: $input){
                  __typename
                  ... on Administrator {
                    id
                  }
                  ... on RegisterAdministratorValidationError {
                    errors {
                      name
                      email
                      password
                      confirmationPassword
                      role
                     }
                  }
                }
            }`;
  it("Registers an administrator if one with its email does not exists yet", async () => {
    const password = faker.internet.password();
    await k("dependencies").insert({
      id: "23161",
      name: "Superadmins dependency",
    });
    const res = await req()
      .post("/graphql")
      .send({
        query,
        variables: {
          input: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: password,
            confirmationPassword: password,
            role: Role.ADMIN,
            dependencyId: "23161",
          },
        },
      });
    expect(res.status).toBe(200);
    expect(res.body.data.registerAdministrator.id).toBeDefined();
  });
  it("Validates its input", async () => {
    const res = await req()
      .post("/graphql")
      .send({
        query,
        variables: {
          input: {
            name: "",
            email: "",
            password: "",
            confirmationPassword: "",
            role: "",
            dependencyId: "",
          },
        },
      });
    const errors = res.body.data.registerAdministrator.errors;
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.role).toBeDefined();
    expect(errors.confirmationPassword).toBeDefined();
  });
});
