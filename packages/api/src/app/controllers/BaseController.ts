import { Response } from "express";
import { logger } from "../logger/logger";
import { ValidationError } from "../../shared/errors/ValidationError";
import { camelCaseToSnakeCase } from "@picket/shared";
export abstract class BaseController {
  protected async handleError(error: Error, res: Response) {
    logger.error(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: "Validation error",
        errors: Object.fromEntries(
          Object.entries(error.errors).map(([key, reasons]) => [
            camelCaseToSnakeCase(key),
            reasons,
          ])
        ),
      });
    }
    return res.status(500).json({
      message: "Unknown error",
    });
  }
}
