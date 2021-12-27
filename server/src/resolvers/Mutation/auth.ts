import { Context } from "../../index";
import { User, Prisma } from "@prisma/client";

interface SignupArgs {
  email: string;
  password: string;
  name: string;
  bio?: string;
}

export const authResolvers = {
  signup: (
    _: any,
    { email, name, password }: SignupArgs,
    { prisma }: Context
  ) => {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return true;
  },
};
