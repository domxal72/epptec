import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import NotFound from "./pages/not-found";

export default function RouterContainer({ posts, comments }) {
  return (
    <div className='container mx-auto px-4 max-w-lg font-sans'>
      <Router>
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
    </div>
  );
}
