import { postgrestClient } from "@/clients/postgrestClient";
import { DependencyDTO } from "@picket/shared";
export const dependenciesService = {
  create: async (dependencyId: string, name: string) => {
    await postgrestClient.post("/dependencies", {
      dependency_id: dependencyId,
      name,
    });
  },
  delete: async (dependencyId: string) => {
    await postgrestClient.delete(`/dependencies?id=eq.${dependencyId}`);
  },
  update: async (dependencyDTO: DependencyDTO) => {
    await postgrestClient.patch(`/dependencies?id=eq.${dependencyDTO.id}`, {
      name: dependencyDTO.name,
      dependency_id: dependencyDTO.dependency_id,
    });
  },
};
