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
      <img className="homepageImage" src={require(`../images/cereal_hand_transparent.png`).default} ></img>
    {isLoggedIn ?
        <div className="pageContainer">
            <h3>Logged in as {localStorage.getItem(`username`)}</h3>
        </div>
        :
    <div className="pageContainer">
        <h2>Login</h2>

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
                <button>Log In</button>
                <div className="signUpSection">
						<p> Don't have an account? </p>
						<Link to="/register" className="signUpLink">Sign Up</Link>
					</div>
        </form>
      
    </div>
}
    </>
)
}

export default Home;