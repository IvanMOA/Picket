import { apiClient } from "@/clients/apiClient";
export const administratorsService = {
  create: async (args: {
    email: string;
    name: string;
    role: string;
    password: string;
    confirmationPassword: string;
    dependencyId: string;
  }) => {
    await apiClient.post("/v1/administrators", {
      email: args.email,
      name: args.name,
      role: args.role,
      password: args.password,
      confirmation_password: args.confirmationPassword,
      dependency_id: args.dependencyId,
    });
  },
};
