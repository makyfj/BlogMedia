import { Context } from "../../index";
import { Post, Prisma } from "@prisma/client";
import { canUserMutatePost } from "../../utils/canUserMutatePost";

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
    { prisma, userId }: Context
  ): Promise<PostPayloadType> => {
    // If user is not logged in, return error
    if (!userId) {
      return {
        userErrors: [
          {
            message:
              "Forbidden access - You must be logged in to update a post",
          },
        ],
        post: null,
      };
    }

    // If user is not the owner of the post, return error
    const error = await canUserMutatePost({
      userId,
      postId,
      prisma,
    });

    if (error) {
      return error;
    }

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
    { prisma, userId }: Context
  ): Promise<PostPayloadType> => {
    // If user is not logged in, return error
    if (!userId) {
      return {
        userErrors: [
          {
            message:
              "Forbidden access - You must be logged in to delete a post",
          },
        ],
        post: null,
      };
    }

    // If user is not the owner of the post, return error
    const error = await canUserMutatePost({
      userId,
      postId,
      prisma,
    });

    // If error, return error
    if (error) return error;

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

  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userId }: Context
  ): Promise<PostPayloadType> => {
    if (!userId) {
      return {
        userErrors: [
          {
            message:
              "Forbidden access - You must be logged in to publish a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId,
      postId,
      prisma,
    });

    if (error) return error;

    const updatePostPublish = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: true,
      },
    });

    return {
      userErrors: [],
      post: updatePostPublish,
    };
  },

  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userId }: Context
  ): Promise<PostPayloadType> => {
    // If user is not logged in, return error
    if (!userId) {
      return {
        userErrors: [
          {
            message:
              "Forbidden access - You must be logged in to unpublish a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId,
      postId,
      prisma,
    });

    if (error) return error;

    const updatePostUnpublish = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: false,
      },
    });

    return {
      userErrors: [],
      post: updatePostUnpublish,
    };
  },
};
