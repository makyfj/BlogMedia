import React from "react";
import Post from "../../components/Post/Post";

// Apollo Client
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const { posts } = data;
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            user={post.user.name}
          />
        );
      })}
    </div>
  );
}
