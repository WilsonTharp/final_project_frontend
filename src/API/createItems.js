const BASE_URL = 'https://stormy-cliffs-19434.herokuapp.com/api';

export async function handleCreateItem(name, price, description, picture) {
	try {
        
		const response = await fetch(BASE_URL + "/items", {
            method: "POST",
			headers: {
                "Content-Type": "application/json",
			},
            body: JSON.stringify({
                name: name,
                price: price,
                description: description,
				picture: picture
            }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
};

export default handleCreateItem;