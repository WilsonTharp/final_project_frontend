import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../API/api';


const Register = () => {

    let history = useHistory();

    const [registerUser, setRegisterUser] = useState({username: '', password: '', firstName:'', lastName:'', location: ''});

    async function registerGetToken() {
        try {

            const data = await API.makeRequest('/users/register', 'POST', registerUser);
            console.log(data);
            // if(data.token){
            //     alert(data.message);
            //     history.push('/users/login');
            // }else{
            //     alert(data.error);
            // }
        } catch (error) {
            alert(error);
        } 
        
    }



function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('username', registerUser.username);
    registerGetToken();
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