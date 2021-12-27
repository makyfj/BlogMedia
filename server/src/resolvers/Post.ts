import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  userId: string;
}

export const Post = {
  user: (parent: PostParentType, _: any, { prisma }: Context) => {
    return userLoader.load(parent.userId);

    //     return prisma.user.findUnique({
    //   where: {
    //     id: parent.userId,
    //   },
    // });
  },
};
