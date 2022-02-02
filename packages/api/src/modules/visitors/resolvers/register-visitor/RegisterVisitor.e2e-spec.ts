import {EnvironmentArranger} from "../../../../shared/infrastructure/environment-arranger/EnvironmentArranger";
import _request from "supertest"
import {Server} from "../../../../app/Server";

beforeEach(async () => {
    await EnvironmentArranger.cleanUp()
})
describe("Register visitor", () => {
    const app = Server.create()
    const req = () => _request(app)
    it("Registers a user if one with its phone number does not exists yet", async () => {
        const query = `
            mutation {
                registerVisitor(name: "A", phoneNumber: "B"){
                  id
                  name
                  phoneNumber
                }
            }`
        const res = await req().post('/graphql').send({ query })
        expect(res.status).toBe(200)
    })
})