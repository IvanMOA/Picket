import express from "express";
import { graphqlHTTP } from "express-graphql";
import { rootValue } from "./graphql/RootValue";
import { schema } from "./graphql/Schema";
import { EnvironmentArranger } from "../shared/infrastructure/environment-arranger/EnvironmentArranger";
import cors from "cors";
import axios from "axios";
import { firebaseProjectId } from "../shared/infrastructure/clients/Firebase";
import { morganMiddleware } from "./middleware/morganMiddleware";
import { logger } from "./logger/logger";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
export class Server {
  public static create() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
        customFormatErrorFn: (error) => {
          logger.error(error);
          return error;
        },
      })
    );
    app.post("/protected/environment-arranger/clean-up", async (r_, res) => {
      await EnvironmentArranger.cleanUp().catch(console.log);
      res.send(200);
    });
    app.post("/protected/environment-arranger/arrange", async (r_, res) => {
      await EnvironmentArranger.arrange().catch(console.log);
      res.send(200);
    });
    app.get("/protected/verification-code", async (req, res) => {
      const { data } = await axios.get(
        `http://localhost:9099/emulator/v1/projects/${firebaseProjectId}/verificationCodes`
      );
      const result = data.verificationCodes.find(
        (verificationCode: any) =>
          verificationCode.phoneNumber === `+52${req.query.phone_number}`
      );
      res.send({ verification_code: result?.code ?? "" });
    });
    app.post("/protected/generate-signed-jwt", async (req, res) => {
      const payload = jwtDecode(req.body.jwt) as Object;
      jwt.sign(
        { ...payload },
        "Q283y8KDKAhelR7QQVJS0KjQud4RJe23bZsxRZtZ7x6l5bsrhWoxpWM6wEN6",
        (err: any, jwt: any) => {
          if (err) res.status(500).send(err);
          res.send({ jwt });
        }
      );
    });
    return app;
  }
}
