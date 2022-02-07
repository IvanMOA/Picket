import { buildSchema } from "graphql";
export const schema = buildSchema(`
    interface Error {
        message: String!
    }
    type Visitor {
        id: String!
        name: String!
        phoneNumber: String!
    }
    type Query {
        visitor: Visitor!
    }
    input RegisterVisitorInput {
        name: String!
        phoneNumber: String!
    } 
    type RegisterVisitorValidationErrors {
        name: [String]
        phoneNumber: [String]
    }
    type RegisterVisitorValidationError implements Error {
        message: String!
        errors: RegisterVisitorValidationErrors!
    }
    union RegisterVisitorResult = Visitor | RegisterVisitorValidationError
    type Mutation {
        registerVisitor(input: RegisterVisitorInput!): RegisterVisitorResult!
    }
`);
