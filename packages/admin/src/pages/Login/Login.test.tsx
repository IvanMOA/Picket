import { Mock, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import { expect } from "vitest";
import Login from "./Login.vue";
import router from "../../router";
import { i18n } from "../../config/i18n";
import userEvent from "@testing-library/user-event";
import { authService } from "../../services/auth/authService";
type Mocked <T extends Record<string, unknown>> = Record<keyof T, Mock>
const authServiceMock = authService as Mocked<typeof authService>;
vi.mock("@/services/auth/authService", () => ({
  authService: {
    login: vi.fn()
  }
}));
test("logs in when credentials are valid", async () => {
  // Given
  const routerPushSpy = vi.spyOn(router, "push");
  authServiceMock.login.mockImplementation(async () => {}) // A function that simply resolves
  render(<Login />, {
    global: {
      plugins: [router, i18n]
    }
  });
  const email = "ax3l.imo@gmail.com";
  const password = "123123";
  // When
  await userEvent.type(screen.getByTestId("email-input"), email);
  await userEvent.type(screen.getByTestId("password-input"), password);
  userEvent.click(screen.getByTestId("submit-btn"));
  // Then
  await waitFor(() => expect(screen.getByTestId("submit-btn")).toBeDisabled());
  await waitFor(() => expect(screen.getByTestId("submit-btn")).not.toBeDisabled());
  expect(authServiceMock.login).toHaveBeenCalledWith(email, password);
  expect(routerPushSpy).toHaveBeenCalled();
});
