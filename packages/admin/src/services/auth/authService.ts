import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import { swallowFirebaseError, UnknownError } from "@picket/utilities";
export const authService = {
  login: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
      swallowFirebaseError(e);
      throw new UnknownError("unknown_error");
    }
  },
};
