import { Context } from "..";

interface ProfileParentType {
  id: string;
  bio: string;
  userId: string;
}

export const Profile = {
  user: (parent: ProfileParentType, _: any, { prisma }: Context) => {
    const user = prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });

    return user;
  },
};
