import React, { useReducer } from 'react';
import './style.css';
import { Base64 } from 'js-base64';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const State = {
	Email: '',
	Password: '',
	IsLogged: false,
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'Email':
			return { ...state, Email: action.value };
		case 'Password':
			return { ...state, Password: action.value };
		case 'Login':
			return { ...state, IsLogged: action.payload };
		default:
	}
};
const Login = () => {
	const [state, dispatch] = useReducer(reducer, State);
	const submit = (e) => {
		e.preventDefault();
		const a = Base64.encode(state.Password);
		fetch(`http://localhost:3333/users?email=${state.Email}&password=${a}`)
			.then((response) => response.json())
			.then((json) => {
				if (json.length === 0) {
					alert('Invalid Email and Password');
				} else {
					localStorage.setItem('Email', json[0].id);
					localStorage.setItem('Profile', json[0].avatar);
					localStorage.setItem(
						'Name',
						json[0].first_name + ' ' + json[0].last_name
					);
					localStorage.setItem('UserEmail', state.Email);
					dispatch({
						type: 'Login',
						payload: !state.IsLogged,
					});
				}
			})
			.catch((error) => alert(`${error}`));
	};
	if (state.IsLogged) {
		return <Redirect to="/posts" />;
	} else {
		return (
			<div className="bg shadow-box-example z-depth-5">
				<div className="form-container">
					<Form className="login-form" onSubmit={submit}>
						<h1>
							<span className="font-weight-bold text-center">Login</span>
						</h1>
						<h2 className="text-center">Welcome</h2>
						<FormGroup className="right">
							<Label>Email</Label>
							<Input
								type="email"
								placeholder="Email"
								value={state.Email}
								onChange={(e) => {
									dispatch({ type: 'Email', value: e.target.value });
								}}
								required
							/>
						</FormGroup>
						<FormGroup className="right">
							<Label>Password</Label>
							<Input
								type="password"
								placeholder="Password"
								value={state.Password}
								onChange={(e) => {
									dispatch({ type: 'Password', value: e.target.value });
								}}
								required
							/>
						</FormGroup>
						<Button className="btn-lg btn-dark btn-block">Login</Button>
						<div className="form-link">
							<Link style={{ color: 'darkblue' }} to="/Registration">
								Registration
							</Link>
						</div>
					</Form>
				</div>
			</div>
		);
	}
};

export default Login;
