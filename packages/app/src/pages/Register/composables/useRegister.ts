import { reactive, ref } from "vue";
import { apiClient } from "@/clients/apiClient";
export const useRegister = () => {
  const isRegistering = ref(false);
  const serverFormErrors = reactive<{
    errors: { name?: string[]; phoneNumber?: string[] };
  }>({ errors: {} });
  const register = async (name: string, phoneNumber: string) => {
    isRegistering.value = true;
    try {
      const { data } = await apiClient.post("/v1/visitors/register", {
        name,
        phone_number: phoneNumber,
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      isRegistering.value = false;
    }
  };
  return {
    isRegistering,
    register,
    serverFormErrors,
  };
};
