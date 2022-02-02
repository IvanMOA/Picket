import {v4 as uuid} from "uuid";
import {auth} from "../../../../shared/infrastructure/clients/Firebase";
import {k} from "../../../../shared/infrastructure/clients/Knex";
export const registerVisitor = async (args: any) => {
    const visitor = {
        id: uuid(),
        name: args.name,
        phoneNumber: `+52${args.phoneNumber}`,
    }
    await auth.createUser({
        displayName: visitor.name,
        phoneNumber: visitor.phoneNumber,
    })
    await k('visitors').insert({
        id: visitor.id,
        name: visitor.name,
        phone_number: visitor.phoneNumber
    })
    return visitor
}