import morgan, { StreamOptions } from "morgan";
import { Request } from "express";
import { logger } from "../../shared/infrastructure/logger/logger";
const stream: StreamOptions = {
  write: (message) => logger.http(message),
};
const registerGraphQLToken = () => {
  morgan.token(
    "graphql-query",
    (req: Request) => `GraphQL "${req?.body?.query}"`
  );
};
registerGraphQLToken();
export const morganMiddleware = morgan(
  ":method :url :status :res[content-length]  - :response-time ms\n:graphql-query",
  { stream }
);
