import { postResolvers } from "./post";
import { authResolvers } from "./Auth";

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
};
