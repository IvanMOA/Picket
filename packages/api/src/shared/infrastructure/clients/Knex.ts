import _knex from "knex"
import path from "path";
const sqlitePath = path.join(__dirname, '..','..', '..', '..', 'dev.sqlite3')
console.log(`Sqlite path on: ${sqlitePath}`)
export const k = _knex({
    client: 'sqlite3',
    connection: {
        filename: sqlitePath
    }
})