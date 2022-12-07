import React, { useState, useEffect } from "react";
import { IPosts } from "./types";
import RouterContainer from "./router-container";

// TODO: handle types and typescript
// TODO polish..
// TODO tailwind production
// TODO consoles and comments remove

const urls = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/comments",
];

export default function App() {
  const [posts, setPosts] = useState<IPosts[] | null>(null);
  const [comments, setComments] = useState<IPosts[] | null>(null);

  async function fetchURLs() {
    // const [posts, users, comments]: [IPosts[], IUsers[], IComments[]] =
    try {
      const [posts, users, comments] = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      // add user name and number of comments to post
      const updatedPosts = posts.map((post) => {
        let [user] = users.filter((user) => user.id === post.userId);
        let postCommnents = comments.filter(({ postId }) => post.id === postId);
        return {
          ...post,
          username: user.username,
          comments: postCommnents.length,
        };
      });
      // TODO mutate data in state after fetch function
      setPosts(updatedPosts);
      setComments(comments);
    } catch (error) {
      console.error("failed to fetch data");
      throw error;
    }
  }

  useEffect(() => {
    fetchURLs();
    return;
  }, []);

  if (posts && comments) {
    //add users...
    return <RouterContainer posts={posts} comments={comments} />;
  }

  return <div>data loading..</div>;
}
