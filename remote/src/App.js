import React, { useContext, useEffect } from 'react';
import './App.css';
import Registration from './Component/Registration';
import Login, { AuthContext } from './Component/Login';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import Post from './Component/Posts';
import Comments from './Component/Comment';
import Upload from './Component/uploadingpost'
function App() {
  
  return (
    <div className="App" >
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Registration" component={Registration} />
          <Route path="/posts" component={Post} />
          <Route path="/comment" component={Comments} />
          <Route path="/post" component={Upload} />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
