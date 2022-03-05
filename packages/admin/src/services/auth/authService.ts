import { UnknownError } from "@picket/utilities/src/error-handling/UnknownError";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import { swallowFirebaseError } from "@picket/utilities/src/error-handling/swallowFirebaseError";
export const authService = {
  login: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      swallowFirebaseError(e);
      throw new UnknownError("unknown_error");
    }
  },
};
