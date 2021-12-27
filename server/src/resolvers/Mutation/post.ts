import { Context } from "../../index";
import { Post, Prisma } from "@prisma/client";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma, userId }: Context
  ): Promise<PostPayloadType> => {
    // If user is not logged in, return error

    console.log(userId);

    if (!userId) {
      return {
        userErrors: [
          {
            message:
              "Forbidden access - You must be logged in to create a post",
          },
        ],
        post: null,
      };
    }

    const { title, content } = post;

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

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          userId: userId,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Need to have at least one field to update",
          },
        ],
        post: null,
      };
    }

    // Checks if post exists
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    // If title is not provided, we don't want to update it
    if (!title) delete payloadToUpdate.title;

    // If content is not provided, we don't want to update it
    if (!content) delete payloadToUpdate.content;

    return {
      userErrors: [],
      post: prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          ...payloadToUpdate,
        },
      }),
    };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    // If post doesn't exist, return error
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    };
  },
};
