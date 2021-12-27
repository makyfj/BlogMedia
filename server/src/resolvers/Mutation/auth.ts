import validator from "validator";

import { Context } from "../../index";
import { User, Prisma } from "@prisma/client";

interface SignupArgs {
  email: string;
  password: string;
  name: string;
  bio?: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  user: null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { email, name, password, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    // Validate email
    const emailIsValid = validator.isEmail(email);

    if (!emailIsValid) {
      return {
        userErrors: [
          {
            message: "Email is invalid",
          },
        ],
        user: null,
      };
    }

    const passwordIsValid = validator.isLength(password, { min: 5 });

    if (!passwordIsValid) {
      return {
        userErrors: [
          {
            message: "Password must be at least 5 characters long",
          },
        ],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "Name and bio are required",
          },
        ],
        user: null,
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return {
      userErrors: [
        {
          message: "Email is invalid",
        },
      ],
      user: null,
    };
  },
};
