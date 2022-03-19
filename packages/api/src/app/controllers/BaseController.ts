import { Response } from "express";
import { camelCaseToSnakeCase } from "@picket/shared";
import { ValidationError } from "../../shared/domain/errors/ValidationError";
import { logger } from "../../shared/infrastructure/logger/logger";
import { NotFoundError } from "../../shared/domain/errors/NotFoundError";
export abstract class BaseController {
  protected async wrapToHandleErrors(
    wrapedFn: () => Promise<any>,
    res: Response
  ) {
    try {
      return await wrapedFn();
    } catch (error) {
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
      if (error instanceof NotFoundError)
        return res.status(404).json({
          message: error.message,
        });
      return res.status(500).json({
        message: "Unknown error",
      });
    }
  }
}
