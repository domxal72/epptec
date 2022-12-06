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

  async function fetchURLs() {
    // const [posts, users, comments]: [IPosts[], IUsers[], IComments[]] =
    const [posts, users, comments] = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    // add user name to post
    const newData = posts.map((post) => {
      const [username] = users.filter((user) => user.id === post.userId);
      return { ...post, username: username.username };
    });

    console.log(newData);
  }

  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsData = await res.json();
    setPosts(postsData);
  }

  useEffect(() => {
    fetchPosts();
    fetchURLs();
    return;
  }, []);

  return (
    <Router>
      <div>
        <ul>
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
          <Detail posts={posts} />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
