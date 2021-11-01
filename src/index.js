import React, { useState, useEffect } from 'react';
import './style.css'
import ReactDOM from 'react-dom';
import TokenUtilities from './API/token';
import API from './API/api';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import {
  Home,
  Header,
  Items,
  Profile,
  Cart,
  Register
} from './components';
import Admin from './components/Admin';

const App = () => {

const [token, setToken] = useState(TokenUtilities.getToken());
const [isLoggedIn, setIsLoggedIn] = useState(!!token);
const [total, setTotal] = useState(0);
const [isAdmin, setAdmin] = useState(false);

useEffect(function() {
	setIsLoggedIn(!!token);
}, [token]);

useEffect( async function() {
	try {
		const username = localStorage.getItem('username');
		const userData = await API.makeRequest(`/users/${username}`, 'GET');
		console.log("USERDATA",userData)
		setAdmin(userData.admin)
		

		
		
	} catch (error) {
		throw error;
	} 
}, []);
console.log("isAdmin",isAdmin)
  return (
    <>
		{/* {isLoggedIn ?
				<div className="messageUnderHeader">
					<h3>Logged in as {localStorage.getItem(`Username`)}</h3>
				</div>
				: */}
			<div className="app">
				<Header
					isLoggedIn = {isLoggedIn} setToken={setToken} isAdmin= {isAdmin}
				/>
				<Switch>
					<Route exact path="/">
						<Home
							setToken ={setToken}
							isLoggedIn = {isLoggedIn}
							// username={username}
							// password={password}
							// setUsername={setUsername}
							// setPassword={setPassword}
							// setRegisterToken={setRegisterToken}
							// userToken={userToken}
							// setUserToken={setUserToken}
						/>
					</Route>

					<Route path="/register">
						<Register 
						isLoggedIn = {isLoggedIn} setToken={setToken}
						/>
					</Route>
				
					<Route path="/items">
						<Items isLoggedIn = {isLoggedIn}/>
					</Route>

					<Route path="/cart">
						<Cart
							total={total} setTotal={setTotal} />
					</Route>

					<Route path="/profile">
						<Profile total={total}/>
					</Route>

					<Route path="/admin">
						<Admin />
					</Route>

					
				</Switch>
			</div>
		{/* } */}
	</>
	)
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))