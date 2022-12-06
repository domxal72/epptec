import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail({ posts }) {
  const { id } = useParams();

  const [post] = posts.filter((post) => {
    return post.id === parseInt(id);
  });
  console.log(post);

  if (post) {
    return <div>{post.title}</div>;
  }

  return <div>no detail found</div>;
}
