import { Context } from "..";

interface PostParentType {
  userId: string;
}

export const Post = {
  user: (parent: PostParentType, _: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
