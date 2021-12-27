import { Context } from "../index";

export const Query = {
  me: (_: any, __: any, { prisma, userId }: Context) => {
    if (!userId) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },

  profile: (_: any, { userId }: { userId: string }, { prisma }: Context) => {
    return prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
  },

  posts: async (_: any, __: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return posts;
  },
};
