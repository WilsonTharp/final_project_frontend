import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'react-router-dom';
import API from '../API/api';
import { handleUsers, handleCreateItem } from "../API/index";

const CreateItem = ({setCreateItem}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');

  async function handleSubmit(event) {
      event.preventDefault();
      await handleCreateItem(name,price, description, picture);
      setCreateItem(false);
  }

  return (
    <div className="createItem">
        <form>
            <button className="closeMenu" onClick={() => setCreateItem(false)} className="quantityButton2">x</button>
            <div>
            <div className="createInputs">
            <input value={name} onChange= {(e) => setName(e.target.value)}  placeholder="name"></input>
            </div>
            <div className="createInputs">
            <input  value={price} onChange= {(e) => setPrice(e.target.value)} placeholder="price"></input>
            </div>
            <div className="createInputs">
            <input  value={description} onChange= {(e) => setDescription(e.target.value)} placeholder="description"></input>
            </div>
            <div className="createInputs">
            <input  value={picture} onChange= {(e) => setPicture(e.target.value)} placeholder="picture"></input>
            </div>
            
            <button className="checkoutButton" onClick={handleSubmit}>Publish</button>
            </div>
        </form>
    </div>
)
}


const Admin = () => {

    const [ourUsers, setOurUsers] = useState([]);
    const [createItem, setCreateItem] = useState(false);
	
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
      }, [createItem]);
      
      return (
        <div>
          <div className="pageContainerLogin">
            
            <div>
            <button className= "checkoutButton"
			onClick={(event) => {
				event.preventDefault();
				setCreateItem(true);
			}}>
				Create Item</button>
			 {
                createItem &&
                <CreateItem setCreateItem={setCreateItem}/>
            }
            </div>
            <div >
		<h1 className="currentUsersTitle">Current Users:</h1>
              {ourUsers.map((users) => {
                console.log(users);
                return (
                  <div key={users.id} className="currentUsers">
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