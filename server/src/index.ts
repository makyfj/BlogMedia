import { ApolloServer } from "apollo-server";
import { PrismaClient, Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";

// Environment variables
dotenv.config();

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
