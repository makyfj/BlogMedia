import validator from "validator";
import bcrypt from "bcryptjs";
import { User, Prisma } from "@prisma/client";

import { Context } from "../../index";

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

    if (!name) {
      return {
        userErrors: [
          {
            message: "Name and bio are required",
          },
        ],
        user: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
