import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import TokenUtilities from '../API/token';
const Header = ({isLoggedIn, setToken}) => {
	//what is wrong with this relative path for image below? Cannot get it to work.

	const history = useHistory();

	function logOut(event) {
		event.preventDefault();
		TokenUtilities.removeToken(); 
		setToken(null);
		history.push('/')
	}
	
    
	return (
		<header className="header">
			<img className="headerImg" src={require(`../images/the_cereal_aisle_logo-01.png`).default} height= '60px'></img>
			<input className="menu-button" type="checkbox" id="menu-button" />
			<label className="menu-icon" for="menu-button"><span className="nav-icon"></span></label>
			<ul className="menu">
				<li><Link to="/items" className="navItem">Cereal</Link></li>
				<li><Link to="/profile" className="navItem">Profile</Link></li>
				<li><Link to="/cart" className="navItem">Cart</Link></li>
				
				
				{isLoggedIn ?
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