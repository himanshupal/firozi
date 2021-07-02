import { Resolvers } from "@apollo/client";

export const resolvers: Resolvers = {
  Query: {
    user: (_, { name }) => name
  }
}