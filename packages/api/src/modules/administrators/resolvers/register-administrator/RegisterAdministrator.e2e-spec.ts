import _request from "supertest";
import { EnvironmentArranger } from "../../../../shared/infrastructure/environment-arranger/EnvironmentArranger";
import { Server } from "../../../../app/Server";
import * as faker from "faker";
import { Role } from "../../../users/domain/Role";
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
          },
        },
      });
    console.log("wtf", res.body);
    const errors = res.body.data.registerAdministrator.errors;
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.role).toBeDefined();
    expect(errors.confirmationPassword).toBeDefined();
  });
});
