import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../API/api';
import TokenUtilities from '../API/token';


const Register = (isLoggedIn, setToken) => {

    let history = useHistory();

    const [registerUser, setRegisterUser] = useState({username: '', password: '', firstName:'', lastName:'', location: ''});

    async function registerGetToken() {
        try {

            const data = await API.makeRequest('/users/register', 'POST', registerUser);
            console.log('THIS IS DATA', data);
            if(isLoggedIn){
            //     alert(data.message);
                history.push('/');
            }else{
                // alert(data.error);
            }
        } catch (error) {
            alert(error);
        } 
        
    }

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
    registerGetToken();
    storeToken();
    
}

function handleInput(event) {
    const userKey = event.target.attributes['name'].value;
    const newState = {...registerUser};
    newState[userKey] = event.target.value;
    setRegisterUser(newState);
}

return (
    <div className='pageContainer'>
       <h2>Register here</h2>
        <form className='form'onSubmit={handleSubmit}>
        
            <input type="text" 
                   required
                   name="username"
                   value={registerUser.username}
                   onChange={handleInput}
                   placeholder="username" />
            

            <input type="password"
                   required
                   name="password"
                   value={registerUser.password}
                   onChange={handleInput}
                   placeholder="password"></input>

            <input type="text"
                   required
                   name="firstName"
                   value={registerUser.firstName}
                   onChange={handleInput}
                   placeholder="firstName"></input>

             <input type="text"
                   required
                   name="lastName"
                   value={registerUser.lastName}
                   onChange={handleInput}
                   placeholder="lastName"></input>

            <input type="text"
                   required
                   name="location"
                   value={registerUser.location}
                   onChange={handleInput}
                   placeholder="location"></input>
            <button>Register</button>
        </form>
    </div>
)
}

export default Register;