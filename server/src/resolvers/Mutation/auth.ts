import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Context } from "../../index";

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio?: string;
}

interface SinginArgs {
  credentials: {
    email: string;
    password: string;
  };
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
    { credentials, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

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

    // Create user profile
    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
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

  signin: async (
    _: any,
    { credentials }: SinginArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    console.log(credentials);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return {
        userErrors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }

    const token: string = await jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
