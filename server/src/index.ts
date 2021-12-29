import { ApolloServer } from "apollo-server";
import { PrismaClient, Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { typeDefs } from "./schema";
import { Query, Mutation, Profile, Post, User } from "./resolvers";
import { getUserFromToken } from "./utils/getUserFromToken";

// Environment variables
dotenv.config();

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userId: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
  context: async ({ req }: any): Promise<Context> => {
    const userId = await getUserFromToken(req.headers.authorization);
    return {
      prisma,
      userId,
    };
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
