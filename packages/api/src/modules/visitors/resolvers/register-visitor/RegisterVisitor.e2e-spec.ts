import { EnvironmentArranger } from "../../../../shared/infrastructure/environment-arranger/EnvironmentArranger";
import _request from "supertest";
import { Server } from "../../../../app/Server";
beforeEach(async () => {
  await EnvironmentArranger.cleanUp();
});
afterAll(async () => {
  await EnvironmentArranger.disconnect();
});
describe("Register visitor", () => {
  const app = Server.create();
  const req = () => _request(app);
  const query = `
            mutation ($input: RegisterVisitorInput!){
                registerVisitor(input: $input){
                  __typename
                  ... on Visitor {
                    id
                  }
                  ... on RegisterVisitorValidationError {
                    errors {
                      name
                      phoneNumber
                     }
                  }
                }
            }`;
  it("Registers a visitor if one with its phone number does not exists yet", async () => {
    const res = await req()
      .post("/graphql")
      .send({
        query,
        variables: {
          input: { phoneNumber: "8124337743", name: "Axel Ivan Morales" },
        },
      });
    expect(res.body.data.registerVisitor.id).toBeDefined();
  });
  it("Validates its input", async () => {
    const res = await req()
      .post("/graphql")
      .send({ query, variables: { input: { phoneNumber: "", name: "" } } });
    console.log(res.body);
    expect(res.body.data.registerVisitor.errors.name).toBeDefined();
    expect(res.body.data.registerVisitor.errors.phoneNumber).toBeDefined();
  });
});
