//Checking if item to be added already exist in Cart. If so, increase the quantity else just add the item to the cart.
export const addItemToCart=(cartItems, cartItemToAdd)=>{
    const existingCartItem=  cartItems.find((cartItem)=>cartItem.id===cartItemToAdd.id)

    if (existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id===cartItemToAdd.id
            ?{...cartItem,quantity:cartItem.quantity+1}: cartItem)
    }
return [...cartItems,{...cartItemToAdd,quantity:1}]
}