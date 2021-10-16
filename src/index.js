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
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     getSomething()
//       .then(response => {
//         setMessage(response.message);
//       })
//       .catch(error => {
//         setMessage(error.message);
//       });
//   });
const [token, setToken] = useState(TokenUtilities.getToken());
const [isLoggedIn, setIsLoggedIn] = useState(!!token);

useEffect(function() {
	setIsLoggedIn(!!token);
}, [token]);
  return (
    <>
			<div className="app">
				<Header
					isLoggedIn = {isLoggedIn} setToken={setToken}
				/>
				<Switch>
					<Route exact path="/">
						<Home
							setToken ={setToken}
							// setLoggedIn={setLoggedIn}
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
						<Register />
					</Route>
				
					<Route path="/items">
						<Items />
					</Route>

					<Route path="/cart">
						<Cart />
					</Route>

					<Route path="/profile">
						<Profile />
					</Route>

					{/* <Route>
						<Message />
					</Route> */}
				</Switch>
			</div>
		</>
	)
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))