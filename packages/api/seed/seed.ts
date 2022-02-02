import {k} from "../src/shared/infrastructure/clients/Knex";
import {v4 as uuid} from "uuid"
import * as faker from 'faker'

const main = async () => {
    await k('visitors').insert({
        id: uuid(),
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        phone_number: faker.phone.phoneNumber('+52##########'),
    })
}
main()