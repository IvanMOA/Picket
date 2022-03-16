import { ValidationError } from "../errors/ValidationError";
import { logger } from "../../app/logger/logger";
type MutationFn = (args: any) => Promise<any>;
export const handleUseCase =
  (mutationFn: MutationFn) => async (args: any) => {};
