import { Context } from "../index";
import { Post } from "@prisma/client";

interface PostCreateArgs {
  title: string;
  content: string;
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "Title and content are required",
          },
        ],
        post: null,
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: "ckxnvldnh00725kcmn9y5ge34",
      },
    });

    return {
      userErrors: [],
      post,
    };
  },
};
