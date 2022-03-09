import { ValidationError } from "./ValidationError";
const matchesRegex = (str: string) => (regEx: RegExp) => {
  return Boolean(str.match(regEx));
};
export const handleFirebaseError = (error: any) => {
  const errorMatch = matchesRegex(error?.code ?? "");
  if (errorMatch(/email-already-exists/g)) {
    return new ValidationError({ email: ["email_already_exists"] });
  }
  if (errorMatch(/invalid-email/g) || errorMatch(/missing-email/g)) {
    return new ValidationError({ email: ["invalid_email"] });
  }
  if (errorMatch(/invalid-password/g)) {
    return new ValidationError({ email: ["invalid_credentials"] });
  }
  if (errorMatch(/wrong-password/g)) {
    return new ValidationError({ email: ["invalid_credentials"] });
  }
  if (errorMatch(/user-not-found/g)) {
    return new ValidationError({ email: ["email_not_found"] });
  }
};
