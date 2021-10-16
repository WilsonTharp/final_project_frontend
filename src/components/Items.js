import React, {useState} from 'react'
import {handleItems} from '../API/index';
import {useHistory, Link} from 'react-router-dom'

const Items = () => {
	const [items, setItems] = useState([]);
	

	useEffect(() => {
		try {
			Promise.all([handleItems()]).then(([data]) => {
				setItems(data);
				console.log(data);
			});
		} catch (error) {
			console.log("ERROR", error);
		}
	}, [createActivity]);

	return (
		<div>
			<h3>ITEMS</h3>
		</div>
	)
}

export default Items;