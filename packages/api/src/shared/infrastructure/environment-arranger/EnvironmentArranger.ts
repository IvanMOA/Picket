import {k} from "../clients/Knex";
import axios from "axios";
import {firebaseProjectId} from "../clients/Firebase";

export class EnvironmentArranger {
    private static tables = ['visitors', 'users', 'tickets', 'events']
    public static async cleanUp(){
        for(const table of this.tables)
            await k(table).truncate()
        await axios.delete(
            `http://localhost:9099/emulator/v1/projects/${firebaseProjectId}/accounts`
        );
    }
    public static async disconnect() {
        await k.destroy()
    }
}