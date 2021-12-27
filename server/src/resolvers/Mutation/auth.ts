import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  token: string | null;
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
        token: null,
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
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "Name and bio are required",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token: string = await jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
