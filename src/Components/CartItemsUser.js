import axios from "axios";
import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
function CartItemsUser() {
    let nav = useNavigate();
    if(isExpired(localStorage.getItem('jwtToken'))){
        console.log("expired");
        alert("Session Timeout Please login again");
        window.location.href="/";
    }
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            axios.get(`http://localhost:8091/loginuser/${localStorage.getItem('jwtToken')}`)
                .then(res => {
                    console.log(res.data)
                    axios.get(`http://localhost:8095/api/userid/${res.data}`)
                        .then(response => {
                            setCartItems(response.data);
                            console.log(response.data);
                        })
                })
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.cartid === itemId) {
                return {
                    ...item, quantity: newQuantity
                };
            } else {
                return item;
            }
        });
        setCartItems(updatedCartItems);
        const cartItem = updatedCartItems.find(item=>item.cartid===itemId);
        axios.post(`http://localhost:8095/api/quantity`,cartItem);
    };

    const handleDelete=(itemId)=>{
        axios.delete(`http://localhost:8095/api/delete/${itemId}`)
        .then(response=>{
            setCartItems(cartItems.filter(item=>item.cartid !== itemId));
        })
        .catch(error => console.error(error));
    }
    const totalprice = cartItems.map(item=>item.quantity*item.price).reduce((accumulator,currentValue)=>accumulator+currentValue,0);
    function submitOrder(){
        if(totalprice===0){ 
            alert("Total price cannot be 0.Please add items to your order");
            nav("/homepage");
            return;
        }
        else{
            nav("/checkout");
        }
    }
    return (
        <div>
            <>
                <table className="table ">
                    <thead>
                        <tr>
                            <th>CartId</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                            <th>Price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr>
                                <td>{item.cartid}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div>
                                        <button onClick={() => handleQuantityChange(item.cartid, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.cartid, item.quantity + 1)}>+</button>
                                    </div>
                                </td>
                                <td>
                                    <Button onClick={()=>handleDelete(item.cartid)}>Delete</Button>
                                </td>
                                <td>${item.quantity * item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <h5>Total Price of all products : ${totalprice}</h5>
                
                <br></br>
                <button className="btn btn-dark mx-4 mr-auto" onClick={submitOrder}>Place Order</button>
                {/* <Link to="/checkout" onClick={submitOrder} className="btn btn-dark mx-4 mr-auto  ">Place Order</Link> */}
               
            </>
        </div>
    );
}
export default CartItemsUser;