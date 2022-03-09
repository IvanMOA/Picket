import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
export const authService = {
  login: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
};
