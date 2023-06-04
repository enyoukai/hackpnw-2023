import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export function Register()
{
	const [registerData, setRegisterData] = useState({
		username: '',
		email: '',
		password: ''
	});

	const navigate = useNavigate();

	const handleRegisterChange = (e) => {
		const { name, value } = e.target;
		setRegisterData((prevData) => ({ ...prevData, [name]: value }));

	};

	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		axios.post('/register', registerData)
			.then((response) => {
				console.log(response.data);
				navigate('/');
			})	
			.catch((error) => {
				console.error(error.response.data);
			});
	};


	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegisterSubmit}>
				<input type="text" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} />
				<input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />
				<input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} />
				<button type="submit">Register</button>
			</form>
		</div>
	);
}