import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import TokenUtilities from '../API/token';


const Header = ({isLoggedIn, setToken, isAdmin}) => {
	
	
	
	const history = useHistory();


	function logOut(event) {
		event.preventDefault();
		TokenUtilities.removeToken(); 
		setToken(null);
		history.push('/')
	}

	
	
    
	return (
		<header className="header">
			<Link to="/"><img className="headerImg" src={require(`../images/the_cereal_aisle_logo-01.svg`).default} height= '80px'></img></Link>
			<input className="menu-button" type="checkbox" id="menu-button" />
			<label className="menu-icon" for="menu-button"><span className="nav-icon"></span></label>
			<ul className="menu">
				<li><Link to="/items" className="navItem">Cereal</Link></li>
				<li><Link to="/profile" className="navItem">Profile</Link></li>
				
				
				
				{isLoggedIn ?
					<>
						<li><Link className="navItem" onClick={logOut}>Log Out</Link></li>
					</>
					: <li><Link to="/" className="navItem">Log In</Link></li>
				}

				{isAdmin ?
					<>
						<li><Link to="/admin" className="navItem">Admin</Link></li>
					</>
					: <></>
				}

<li><Link to="/cart" className="navItem"><img className="headerImg2" src={require(`../images/cart_icon_empty-01.png`).default} height= '60px'></img></Link></li>
			</ul>
		</header>
	)
	
}


export default Header;