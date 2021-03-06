import React, { useReducer } from 'react';
import './style.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const State = {
	Title: '',
	Body: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'title':
			return { ...state, Title: action.value };
		case 'body':
			return { ...state, Body: action.value };
		default:
	}
};

function UploadComment() {
	const [state, dispatch] = useReducer(reducer, State);
	const id = localStorage.getItem('userId');
	const userEmail = localStorage.getItem('UserEmail');
	const setData = (e) => {
		e.preventDefault();
		fetch('http://localhost:3333/comments', {
			method: 'POST',
			body: JSON.stringify({
				postId: id,
				name: state.Title,
				email: userEmail,
				body: state.Body,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
			})
			.catch((error) => {
				alert(error);
			});
		alert('Sucessfully Post');
		window.location.href = '/comments';
	};
	const Back = () => {
		window.location.href = '/posts';
	};
	return (
		<div className="bg">
			<Button className="btn-lg btn-dark btn--block back" onClick={Back}>
				Posts
			</Button>
			<div className="form-container">
				<Form className="login-form" onSubmit={setData}>
					<h1>
						<span className="font-weight-bold">Comments</span>
					</h1>
					<FormGroup className="right">
						<Label>Title</Label>
						<Input
							type="text"
							placeholder="Enter Name"
							value={state.Email}
							onChange={(e) => {
								dispatch({ type: 'title', value: e.target.value });
							}}
							required
						/>
					</FormGroup>
					<FormGroup className="right">
						<Label>First Name</Label>
						<Input
							type="textarea"
							placeholder="Enter Your Comments"
							value={state.First}
							onChange={(e) => {
								dispatch({ type: 'body', value: e.target.value });
							}}
							required
						/>
					</FormGroup>
					<Button className="btn-lg btn-dark btn-block">Submit</Button>
					<div className="text-center"></div>
				</Form>
			</div>
		</div>
	);
}

export default UploadComment;
