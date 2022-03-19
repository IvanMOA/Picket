import _request from "supertest";
import { Server } from "@app/Server";
import { EnvironmentArranger } from "../src/shared/infrastructure/environment-arranger/EnvironmentArranger";
beforeEach(async () => {
  await EnvironmentArranger.cleanUp();
});
afterAll(async () => {
  await EnvironmentArranger.disconnect();
});
describe("Register visitor", () => {
  const app = Server.bootstrap();
  const req = () => _request(app);
  it("Registers a visitor if one with its phone number does not exists yet", async () => {
    const res = await req().post("/v1/visitors").send({
      phone_number: "8124337743",
      name: "Axel Ivan Morales",
    });
    expect(res.status).toBe(201);
    expect(res.body.visitor.id).toBeDefined();
  });
  it("Validates its input", async () => {
    const res = await req()
      .post("/v1/visitors")
      .send({ phone_number: "", name: "" });
    expect(res.body.errors.name).toBeDefined();
    expect(res.body.errors.phone_number).toBeDefined();
  });
});
