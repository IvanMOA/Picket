import { ValidationError } from "./ValidationError";
const matchesRegex = (str: string) => (regEx: RegExp) => {
  return Boolean(str.match(regEx));
};
export const swallowFirebaseError = (error: any) => {
  const errorMatch = matchesRegex(error?.code ?? "");
  if (errorMatch(/email-already-exists/g)) {
    throw new ValidationError({ email: ["email_already_exists"] });
  }
  if (errorMatch(/invalid-email/g) || errorMatch(/missing-email/g)) {
    throw new ValidationError({ email: ["invalid_email"] });
  }
  if (errorMatch(/invalid-password/g)) {
    throw new ValidationError({ email: ["invalid_credentials"] });
  }
  if (errorMatch(/wrong-password/g)) {
    throw new ValidationError({ email: ["invalid_credentials"] });
  }
  if (errorMatch(/user-not-found/g)) {
    throw new ValidationError({ email: ["email_not_found"] });
  }
};
