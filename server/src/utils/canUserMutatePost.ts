import { Context } from "..";

interface CanUserMutatePostArgs {
  userId: string;
  postId: string;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostArgs) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.userId !== userId) {
    return {
      userErrors: [
        {
          message: "You do not have permission to edit this post",
        },
      ],
      post: null,
    };
  }
};
