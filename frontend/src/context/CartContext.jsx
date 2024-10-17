import { createContext, useState } from "react";

export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {

    const [cartList, setCartList] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    const addToCarts = async (pid, token) => {
        try {
            const response = await fetch(`http://localhost:5000/cartlist/${pid}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
    
            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }
    
            const result = await response.json();
            setCartList((prevCartList) => [...prevCartList, result.cartItem]);
            // console.log("Item added to cart:", result.cartItem);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCartListFromDatabase = async() => {
        try {
            const response = await fetch('http://localhost:5000/cartlist')
            if (!response.ok) {
                throw new Error("an error happen")
            }
            const result = await response.json()
            setCartItem(result)
        } catch (error) {
            console.log(error.message)
        }
    }

    

    const removeFromCarts = async(id, token) => {
        try {
            const removedItem = await fetch(`http://localhost:5000/cartlist/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            });
            const result = await removedItem.json();
            console.log(result)
        } catch (error) {
            console.log(error.message)
        }
        const filterItem = cartList.filter((cartItem) => cartItem === id)
        setCartList(filterItem)
        window.location.reload()
    }

    const getTotal = (cartList) => {
        let total = 0;
        cartList.forEach((item => total = total + item.price))
        return total
    }

    return (
        <CartContext.Provider value={{cartList, cartItem, addToCarts, getCartListFromDatabase, removeFromCarts, getTotal}}>
            {children}
        </CartContext.Provider>
    )
}