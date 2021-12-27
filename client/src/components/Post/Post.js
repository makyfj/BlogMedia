import React from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PostPublish($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        title
        id
        published
      }
      userErrors {
        message
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation PostUnpublish($postId: ID!) {
    postUnpublish(postId: $postId) {
      post {
        title
      }
      userErrors {
        message
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [postPublish, { data, loading }] = useMutation(PUBLISH_POST);

  const [postUnpublish, { data: unpublishData, loading: unpublishLoading }] =
    useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(Number(date));

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "green" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() =>
            postPublish({
              variables: {
                postId: id,
              },
            })
          }
        >
          Publish
        </p>
      )}

      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() =>
            postUnpublish({
              variables: {
                postId: id,
              },
            })
          }
        >
          Unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
