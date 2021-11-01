import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../API/api';
import TokenUtilities from '../API/token';

const Home = ({isLoggedIn, setToken}) => {
    let history = useHistory();
    const [user, setUser] = useState({username: '', password: ''});
    
    async function storeToken() {
        try {
           
            const data = await API.makeRequest('/users/login', 'POST', user);
            if(data.token){
            TokenUtilities.setToken(data.token);
            console.log(data);
            setToken(data.token);
            history.push('/');
            }else{
                alert(data.error);
            }
        } catch (error) {
            alert(error);
        } 
    }

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('username', user.username);
        storeToken();
    }

    function handleInput(event) {
        const userKey = event.target.attributes['name'].value;
        const newState = {...user};
        newState[userKey] = event.target.value;
        setUser(newState);
    }
    console.log("IS LOGGED IN", isLoggedIn)
return (
    <>
      
    {isLoggedIn ?
        <div className="pageContainer">
           
            <h3>Welcome back <h1>{localStorage.getItem(`username`)}</h1></h3>
            <img className="homepageImage3" src={require(`../images/cereal_hand_transparent.png`).default} ></img>
            <div className="featuredItems2">
        <h3>Featured Items</h3>
    <div className="featuredItemsImages">
    <img className="homepageImage" src={require(`../images/cheerios.jpg`).default} ></img>
    <img className="homepageImage" src={require(`../images/captian_crunch.jpg`).default} ></img>
    <img className="homepageImage" src={require(`../images/kix.jpg`).default} ></img>
    </div>
    <button className="shopNowButton"><Link to="/items" className="shopNowLink">Shop Now!</Link></button>
    </div>
        </div>
        :
        <>
    <div className="pageContainerLogin">
       
        
        <form  className ='form' onSubmit={handleSubmit} >
                <input type="text" 
                        required
                        name="username"
                        value={user.username}
                        onChange={handleInput}
                        placeholder="username" />
                <input type="password"
                        required
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="password"></input>
                <button className="logInButton">Log In</button>
                <div className="signUpSection">
						<p> Don't have an account? </p>
						<button><Link to="/register" className="signUpLink">Sign Up</Link></button>
					</div>
        </form>
      
    </div>
    <img className="homepageImage" src={require(`../images/cereal_hand_transparent.png`).default} ></img>
    <div className="featuredItems">
        <h3>Featured Items</h3>
    <div className="featuredItemsImages">
    <img className="homepageImage" src={require(`../images/cheerios.jpg`).default} ></img>
    <img className="homepageImage" src={require(`../images/captian_crunch.jpg`).default} ></img>
    <img className="homepageImage" src={require(`../images/kix.jpg`).default} ></img>
    </div>
    <button className="shopNowButton"><Link to="/items" className="shopNowLink">Shop Now!</Link></button>
    </div>
    </>
}
    </>
)
}

export default Home;