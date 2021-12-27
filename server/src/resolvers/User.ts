import { Context } from "..";

interface UserParentType {
  id: string;
}

export const User = {
  posts: (parent: UserParentType, _: any, { prisma, userId }: Context) => {
    // If user owns this profile, return published and unpublished posts
    const isOwnProfile = parent.id === userId;

    if (isOwnProfile) {
      // Return all posts
      return prisma.post.findMany({
        where: {
          userId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    } else {
      // Return only published posts
      return prisma.post.findMany({
        where: {
          userId: parent.id,
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }
  },
};
