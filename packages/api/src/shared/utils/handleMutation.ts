import { ValidationError } from "../errors/ValidationError";
import { logger } from "../../app/logger/logger";
type MutationFn = (args: any) => Promise<any>;
export const handleMutation = (mutationFn: MutationFn) => async (args: any) => {
  try {
    return await mutationFn(args);
  } catch (e) {
    if (e instanceof ValidationError) return e.toPrimitives();
    logger.error(e);
    throw e;
  }
};
