import Register from "./Register.vue"
import {render, screen} from "@testing-library/vue";
describe("Register", () => {
  it("should ", () => {
    render(Register)
    screen.getByText('Registrarse')
  });
});
