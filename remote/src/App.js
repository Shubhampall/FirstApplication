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
import Uploadingpost from './Component/uploadingpost'
import Demo1 from './Component/demo1';
function App() {
  return (
    <div className="App" >
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Regisration" component={Registration} />
          <Route path="/posts" component={Post} />
          <Route path="/comment" component={Comments} />
          <Route path="/post" component={Uploadingpost} />
          <Route path="/demo" component={Demo1} />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
