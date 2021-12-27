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

  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userId: userIdAuth }: Context
  ) => {
    const isMyProfile = userIdAuth === userId;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      isMyProfile,
    };
  },

  posts: async (_: any, __: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return posts;
  },
};
