import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";

interface IPosts {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IComments {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const NotFound = () => {
  return <div>404</div>;
};

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
      // ...seems all posts have just 5 comments
    });
    // TODO mutate data in state after fetch function
    setPosts(updatedPosts);
    setComments(comments);
    console.log(updatedPosts);
  }

  useEffect(() => {
    fetchURLs();
    return;
  }, []);

  return (
    // TODO fix router loading
    <Router>
      <div>
        <ul>
          {/* TODO styling... */}
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/detail'>Detail</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path='/'>
          <Home posts={posts} />
        </Route>
        <Route exact path='/detail/:id'>
          <Detail posts={posts} comments={comments} />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
