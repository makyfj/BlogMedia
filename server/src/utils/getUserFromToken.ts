import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    return decoded.userId;
  } catch (error) {
    return null;
  }
};
