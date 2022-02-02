import express from "express";
import {graphqlHTTP} from "express-graphql";
import {rootValue} from "./graphql/RootValue";
import {schema} from "./graphql/Schema";
import {EnvironmentArranger} from "../shared/infrastructure/environment-arranger/EnvironmentArranger";
import cors from "cors"
import axios from "axios";
import {firebaseProjectId} from "../shared/infrastructure/clients/Firebase";

export class Server {
    public static create() {
        const app = express()
        app.use(cors())
        app.use('/graphql', graphqlHTTP({
            schema,
            rootValue,
            graphiql: true
        }))
        app.post("/protected/environment-arranger/clean-up", async (r_, res) => {
            await EnvironmentArranger.cleanUp()
            res.send(200)
        })
        app.get("/protected/verification-code", async (req, res) => {
            const {data} = await axios.get(`http://localhost:9099/emulator/v1/projects/${firebaseProjectId}/verificationCodes`)
            console.log(req.query.phone_number)
            const result = data.verificationCodes.find((verificationCode: any) => verificationCode.phoneNumber === `+52${req.query.phone_number}`)
            console.log(result, data.verificationCodes)
            res.send({verification_code: result?.code ?? ''})
        })
        return app
    }
}