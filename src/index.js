import React, { useState, useEffect } from 'react';
import './style.css'
import ReactDOM from 'react-dom';
import TokenUtilities from './API/token';
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

const App = () => {

const [token, setToken] = useState(TokenUtilities.getToken());
const [isLoggedIn, setIsLoggedIn] = useState(!!token);
const [total, setTotal] = useState(0);

useEffect(function() {
	setIsLoggedIn(!!token);
}, [token]);


  return (
    <>
		{/* {isLoggedIn ?
				<div className="messageUnderHeader">
					<h3>Logged in as {localStorage.getItem(`Username`)}</h3>
				</div>
				: */}
			<div className="app">
				<Header
					isLoggedIn = {isLoggedIn} setToken={setToken}
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
						<Items />
					</Route>

					<Route path="/cart">
						<Cart
							total={total} setTotal={setTotal} />
					</Route>

					<Route path="/profile">
						<Profile />
					</Route>

					
				</Switch>
			</div>
		{/* } */}
	</>
	)
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))