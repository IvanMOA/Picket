import { defineStore } from "pinia";
import { User as FirebaseAuthUser } from "firebase/auth";
type User = FirebaseAuthUser & { role: string; dependencyId: string };
type UserStoreState = {
  user: User | null;
};
type UserStoreActions = {
  setUser(user: User): void;
};
export const useUserStore = defineStore<
  "user",
  UserStoreState,
  any,
  UserStoreActions
>("user", {
  state: () => {
    return { user: null };
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
export const useLoggedInUser = () => {
  const { user } = useUserStore();
  return { user: user! };
};
