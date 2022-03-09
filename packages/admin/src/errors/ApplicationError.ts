import { ValidationError } from "@/errors/ValidationError";
import { UnknownError } from "@/errors/UnknownError";
export type ApplicationError = ValidationError | UnknownError;
