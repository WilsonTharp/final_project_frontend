import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';
import { handleUsers } from "../API/index";


const Admin = () => {

    const [ourUsers, setOurUsers] = useState([]);
	
	console.log("OUR USERS", ourUsers)
	

    useEffect(() => {
        try {
          Promise.all([handleUsers()]).then(([data]) => {
            setOurUsers(data);
          }),
            [];
        } catch (error) {
          console.log("ERROR", error);
        }
      }, []);
      
      return (
        <div>
          <div className="pageContainerLogin">
            <h1 className="pageTitle">Current Users:</h1>
            <div>
              {ourUsers.map((users) => {
                console.log(users);
                return (
                  <div key={users.id}>
                       <h2>{users.username}</h2>
                        <h3>${users.password}</h3>
                        <p>{users.firstName}</p>
                        <p>{users.lastName}</p>
                        <p>{users.location}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

export default Admin;