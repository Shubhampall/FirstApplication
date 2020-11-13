import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Post from './Component/Posts';
import Comments from './Component/Comment';
import Upload from './Component/uploadingpost';
import Logout from './Component/Logout';
import UploadComment from './Component/UploadComment';
import Profile from './Component/Profile';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/Registration" component={Registration} />
					<Route path="/posts" component={Post} />
					<Route path="/comment" component={Comments} />
					<Route path="/post" component={Upload} />
					<Route path="/logout" component={Logout} />
					<Route path="/comments" component={UploadComment} />
					<Route path="/profile" component={Profile} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
