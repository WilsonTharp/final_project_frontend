import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn}) => {
	//what is wrong with this relative path for image below? Cannot get it to work.

	const history = useHistory();

	function logOut(event) {
		event.preventDefault();
		localStorage.removeItem('Token')
		setLoggedIn(null);
		history.push('/')
	}

	return (
		<header className="header">
			<h1>Cereal Bar</h1>
			<input className="menu-button" type="checkbox" id="menu-button" />
			<label className="menu-icon" for="menu-button"><span className="nav-icon"></span></label>
			<ul className="menu">
				<li><Link to="/items" className="navItem">Cereal</Link></li>
				<li> <Link to="/profile" className="navItem">Profile</Link></li>
				<li><Link to="/cart" className="navItem">Cart</Link></li>
				
				
				{loggedIn ?
					<>
						<li><Link className="navItem" onClick={logOut}>Log Out</Link></li>
					</>
					: <li><Link to="/" className="navItem">Log In</Link></li>
				}
			</ul>
		</header>
	)
}

export default Header;