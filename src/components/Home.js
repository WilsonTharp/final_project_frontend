import React from 'react';
import {useHistory, Link} from "react-router-dom";
import {handleLogIn} from '../API/index';

const Home = ({username, password, setUsername, setPassword, setUserToken, loggedIn, setLoggedIn}) => {
	// const history = useHistory()

	// const logInRequest = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const data = await handleLogIn(username, password);
	// 		if (data.error) {
	// 			history.push("/message");
	// 		} else {
	// 			const token = data.token;
	// 			localStorage.setItem(`Token`, token);
	// 			setUserToken(token);
	// 			setLoggedIn(true);
	// 			setUsername(username);

	// 			localStorage.setItem(`Username`, username);
	// 			history.push("/");
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return (
        
		<>
		<div>
		<label>username</label>
			<input></input>
		<label>password</label>
			<input></input>
		</div>	

		<div className="buttonContainer">
						<button className="loginButton">Log In</button>
					</div>
					<div className="signUpSection">
						<p> Don't have an account? </p>
						<Link to="/register" className="signUpLink">Sign Up</Link>
					</div>
		</>
	)
}

export default Home;