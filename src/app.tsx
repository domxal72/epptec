import React, { useState, useEffect } from "react";
import RouterContainer from "./router-container";

const urls = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/comments",
];

export default function App() {
  const [posts, setPosts] = useState(null);

  async function fetchURLs() {
    try {
      const [posts, users, comments] = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      // add username and comments to post
      const updatedPosts = posts.map((post) => {
        let [user] = users.filter((user) => user.id === post.userId);
        let postCommnents = comments.filter(({ postId }) => post.id === postId);
        return {
          ...post,
          username: user.username,
          comments: postCommnents,
        };
      });
      setPosts(updatedPosts);
    } catch (error) {
      throw error;
    }
  }

  useEffect(fetchURLs, []);

  if (posts) {
    return <RouterContainer posts={posts} />;
  }

  return <div>data loading..</div>;
}
