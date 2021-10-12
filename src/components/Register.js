import React from 'react';
import {useHistory, Link} from "react-router-dom";
import {handleLogIn} from '../API/index';

const Register = ({username, password, setUsername, setPassword, setUserToken, loggedIn, setLoggedIn}) => {
	

	return (
        
		<>
		<div>
		<label>username</label>
			<input></input>
		<label>password</label>
			<input></input>
		</div>	

		<div className="buttonContainer">
						<button className="loginButton">Sign Up</button>
					</div>
		</>
	)
}

export default Register;