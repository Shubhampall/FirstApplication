import React, { useReducer, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Button, Navbar } from 'reactstrap';
import './style.css';
const State = {
	posts: '',
	comments: [],
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'post':
			return { ...state, posts: action.payload };
		case 'comment':
			return { ...state, comments: action.payload };
		default:
	}
};
const Comments = () => {
	const [state, dispatch] = useReducer(reducer, State);
	const user = localStorage.getItem('Email');
	const location = useLocation();
	let PostId = location.pathname.match(/(\d+)/)[0].toString();
	localStorage.setItem('userId', PostId);
	useEffect(() => {
		fetch(`http://localhost:3333/posts/${PostId}`)
			.then((response) => response.json())
			.then((json) => dispatch({ type: 'post', payload: json.title }))
			.catch((error) => alert(`${error}`));
		fetch(`http://localhost:3333/comments?postId=${PostId}`)
			.then((response) => response.json())
			.then((json) => dispatch({ type: 'comment', payload: json }))
			.catch((error) => alert(`${error}`));
	}, [PostId]);

	const ViewData = () => {
		return (
			<React.Fragment>
				{state.comments.map((post, count) => (
					<div key={post.id} className="post">
						<h3>
							<span>Comment:-</span>
							{count + 1} {post.body}
						</h3>
					</div>
				))}
			</React.Fragment>
		);
	};
	const Logout = () => {
		window.location.href = '/logout';
	};
	const Back = () => {
		window.location.href = '/posts';
	};
	const Comment = () => {
		window.location.href = '/comments';
	};
	if (user == null) {
		return <Redirect to="/" />;
	} else {
		return (
			<div>
				<Navbar bg="primary" variant="dark">
					<Button className="btn-lg btn-dark btn--block back" onClick={Back}>
						Back
					</Button>
					<h2 className="abc">Comment</h2>
					<Button
						className="btn-lg btn-dark btn--block position"
						onClick={Logout}
					>
						Logout
					</Button>
					<Button
						className="btn-lg btn-dark btn--block position1"
						onClick={Comment}
					>
						Comment
					</Button>
				</Navbar>
				<h1>{state.posts}</h1>
				{state.comments.length > 0 ? <ViewData /> : null}
			</div>
		);
	}
};
export default Comments;
