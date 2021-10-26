const BASE_URL = "https://stormy-cliffs-19434.herokuapp.com/api";

export async function handleCreateCart(userId,itemId,quantity){
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
                
            body: JSON.stringify({
                    userId: userId,
                    itemId: itemId,
                    quantity: quantity,
                }
              )
        }).then(response => response.json())
        .then(result => {
            console.log(result)
        
        })
    } catch (error) {
        console.error(error);
    }
}

export default handleCreateCart;