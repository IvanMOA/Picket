import _request from "supertest";
import * as faker from "faker";
import { Server } from "../src/app/Server";
import { EnvironmentArranger } from "../src/shared/infrastructure/environment-arranger/EnvironmentArranger";
import { k } from "../src/shared/infrastructure/clients/Knex";
import { Role } from "../src/modules/users/domain/Role";
import { AuthHeaders } from "./helpers/auth";
import { DependenciesSeeder } from "../seed/DependenciesSeeder";
import { AdministratorsSeeder } from "../seed/AdministratorsSeeder";
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
    const dependency = await DependenciesSeeder.create({
      dependencyId: "23161",
      name: "Facultad de Ingeniería Mecánica y Eléctrica",
    });
    const administratorEmail = faker.internet.email();
    const administratorPassword = faker.internet.password();
    await AdministratorsSeeder.create({
      name: faker.name.findName(),
      email: administratorEmail,
      password: administratorPassword,
      confirmationPassword: administratorPassword,
      role: Role.ADMIN,
      dependencyId: dependency.id,
    });
    const anotherAdministratorEmail = faker.internet.email();
    const anotherAdministratorPassword = faker.internet.password();
    const administratorToPatch = await AdministratorsSeeder.create({
      name: faker.name.findName(),
      email: anotherAdministratorEmail,
      password: anotherAdministratorPassword,
      confirmationPassword: anotherAdministratorPassword,
      role: Role.ADMIN,
      dependencyId: dependency.id,
    });
    const newEmail = "juangarza@gmail.com";
    const newName = "Juan Garza";
    const newRole = Role.GUARD;
    const deleteRes = await req()
      .patch(`/v1/administrators/${administratorToPatch.id}`)
      .send({ name: newName, email: newEmail, role: newRole })
      .set(
        await AuthHeaders.fromEmailAndPassword(
          administratorEmail,
          administratorPassword
        )
      );
    expect(deleteRes.status).toBe(200);
  });
});
