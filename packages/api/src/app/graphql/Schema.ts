import { buildSchema } from "graphql";
export const schema = buildSchema(`
    interface Error {
        message: String!
    }
    enum Role {
      VISITOR
      ADMIN
    }
    type Visitor {
        id: String!
        name: String!
        phoneNumber: String!
    }
    type Administrator {
        id: String!
        name: String!
        role: Role!
    }
    type Query {
        visitor: Visitor!
    }
    
    #
    # Register visitor mutation
    #
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
    
    #
    # Register administrator mutation
    #
    input RegisterAdministratorInput {
      name: String!
      email: String!
      password: String!
      confirmationPassword: String!
      role: String!
    }
    type RegisterAdministratorValidationErrors {
      name: [String]
      email: [String]
      password: [String]
      confirmationPassword: [String]
      role: [String]
    }
    type RegisterAdministratorValidationError implements Error {
        message: String!
        errors: RegisterAdministratorValidationErrors!
    }
    union RegisterAdministratorResult = Administrator | RegisterAdministratorValidationError
    
    #
    # Mutations
    #
    
    type Mutation {
        registerVisitor(input: RegisterVisitorInput!): RegisterVisitorResult!
        registerAdministrator(input: RegisterAdministratorInput!): RegisterAdministratorResult!
    }
`);
