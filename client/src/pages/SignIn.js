import { useState } from 'react';
import axios from 'axios';

export function SignIn()
{
	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});

	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({ ...prevData, [name]: value }));
	};

	
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/login', loginData)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error(error.response.data);
		});
	};
	

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLoginSubmit}>
				<input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
				<input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
				<button type="submit">Login</button>
			</form>
	  	</div>
	);
}