const BASE_URL = "https://stormy-cliffs-19434.herokuapp.com/api";

export async function handleCreateCart(userId,itemId,count){
    //ASK SHANNON: authorization error? Sending token though.
    try {
        const token = localStorage.getItem('vb-token')
        console.log(token)
        console.log('UserId is', userId)
        console.log('itemId is', itemId)
        console.log('count is', count)
        
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
                
            body: JSON.stringify({
                    userId: userId,
                    itemId: itemId,
                    quantity: count,
            }),
        });
        const data = await response.json();
        console.log('CreateCART', data)
		return data;
    } catch (error) {
        console.error(error);
    }
}

// export async function handleCreateRoutine(name, goal, isPublic) {
// 	try {
//         const token = localStorage.getItem('Token');
//            console.log(name, goal, isPublic);
// 		const response = await fetch(BASE_URL + "/routines", {
//             method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
// 			},
//             body: JSON.stringify({
//                 name: name,
//                 goal: goal,
//                 isPublic: isPublic
//             }),
// 		});
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export default handleCreateRoutine;

export default handleCreateCart;