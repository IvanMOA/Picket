import { ValidationError } from "@/errors/ValidationError";
import { UnknownError } from "@/errors/UnknownError";
import { ApplicationError } from "@/errors/ApplicationError";
import { handleFirebaseError } from "@/errors/handleFirebaseError";
export const handleError = (error: unknown): ApplicationError => {
  console.log(error);
  if (error instanceof ValidationError) return error;
  const firebaseError = handleFirebaseError(error);
  if (firebaseError) return firebaseError;
  return new UnknownError("Error desconocido");
};
