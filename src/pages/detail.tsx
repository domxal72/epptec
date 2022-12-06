import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail({ posts, comments }) {
  const { id } = useParams();

  const [post] = posts.filter((post) => {
    return post.id === parseInt(id);
  });
  console.log(post);

  if (post) {
    return (
      <div>
        <Link to='/'>back</Link>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <div>
          <p>Comments</p>
          <ul>
            {comments
              .filter(({ postId }) => postId === post.id)
              .map(({ id, body, name, email }) => {
                return (
                  <li key={id}>
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{body}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }

  return <div>no detail found</div>;
}
