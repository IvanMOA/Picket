import {buildSchema} from "graphql";

export const schema = buildSchema(`
    type Visitor {
        id: String!
        name: String!
        phoneNumber: String!
    }
    type Query {
        visitor: Visitor!
    }
    type Mutation {
        registerVisitor(name: String!, phoneNumber: String!): Visitor!
    }
`)