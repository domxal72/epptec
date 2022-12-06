import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  if (posts) {
    return (
      <div>
        {posts.map(({ id, title, body, username, comments }) => (
          <li key={id}>
            <Link to={`/detail/${id}`}>
              <p>{title}</p>
              <p>{username}</p>
              <p>{body.slice(0, 50).concat("...")}</p>
              <p>{comments}</p>
            </Link>
          </li>
        ))}
      </div>
    );
  }
  return <div>no posts</div>;
}
