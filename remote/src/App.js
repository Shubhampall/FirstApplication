import React from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Starting from './Component/Starting';
import Demo from './Component/demo'
import Post from './Component/Posts';
import Comments from './Component/Comment';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Regisration" component={Registration} />
          <Route path="/posts" component={Post} />
          <Route path="/comment" component={Comments} />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
