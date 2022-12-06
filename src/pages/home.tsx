import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  if (posts) {
    return (
      <div>
        {posts.map(({ id, title, body }) => (
          <li key={id}>
            <Link to={`/detail/${id}`}>
              <p>{title}</p>
              <p>{body}</p>
            </Link>
          </li>
        ))}
      </div>
    );
  }
  return <div>no posts</div>;
}
