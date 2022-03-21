import express from "express";
import { EnvironmentArranger } from "../shared/infrastructure/environment-arranger/EnvironmentArranger";
import cors from "cors";
import axios from "axios";
import { firebaseProjectId } from "../shared/infrastructure/clients/Firebase";
import { morganMiddleware } from "./middleware/morganMiddleware";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { AdministratorsControllerV1 } from "./controllers/v1/AdministratorsControllerV1";
import { KnexAdministratorsRepository } from "../modules/administrators/infrastructure/KnexAdministratorsRepository";
import { KnexVisitorsRepository } from "../modules/visitors/infrastructure/KnexVisitorsRepository";
import { VisitorsControllerV1 } from "./controllers/v1/VisitorsControllerV1";
import { PlacesControllerV1 } from "@app/controllers/v1/PlacesControllerV1";
import path from "path";
export class Server {
  public static bootstrap() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    const administratorsRepository = new KnexAdministratorsRepository();
    const visitorsRepository = new KnexVisitorsRepository();
    const administratorsControllerV1 = new AdministratorsControllerV1(
      administratorsRepository
    );
    const visitorsControllerV1 = new VisitorsControllerV1(visitorsRepository);
    const placesControllerV1 = new PlacesControllerV1();
    app.use(administratorsControllerV1.router);
    app.use(visitorsControllerV1.router);
    app.use(placesControllerV1.router);
    console.log(path.join(__dirname, "..", "..", "storage"));
    app.use(
      "/storage",
      express.static(path.join(__dirname, "..", "..", "storage"))
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
