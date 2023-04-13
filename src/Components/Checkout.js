import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
// import Payment from "./Payment";
function Checkout() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        console.log("expired");
        alert("Session Timeout Please login again");
        window.location.href="/";
    }
    
    let nav = useNavigate();
    const [address, setaddress] = useState('');
    const[phonenumber,setPhonenumber]=useState('');
    const[error,setError]=useState(null);
    const [cartItems, setCartItems] = useState([]);
    let orders=" ";
   

    useEffect(() => {
        // const cartHandler = (e) => {
        // const user="";
        async function fetchData() {
            axios.get(`http://localhost:8091/loginuser/${localStorage.getItem('jwtToken')}`)
                .then(res => {
                    axios.get(`http://localhost:8095/api/userid/${res.data}`)
                        .then(response => {
                            setCartItems(response.data);
                            console.log(response.data);
                        })
                })
        }
        fetchData();
    }, []);
    orders = orders+cartItems.map(item=> (item.name+"-"+item.quantity+"-"+item.price));
    console.log(orders);
    const totalprice = cartItems.map(item => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const handlePlaceOrder = (e,address,orders,phonenumber,totalprice) => {
        e.preventDefault();
        if(!address.trim()){
            setError("Address is required");
            return;
        }
        const phoneRegex=/^\d{10}$/;
        if(!phoneRegex.test(phonenumber)){
            setError("Phone number is invalid");
            return;
        }
        axios.get(`http://localhost:8091/loginuser/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                axios.post(`http://localhost:8096/orders/placeorder`, {
                    "address": address,
                    "userid":res.data,
                    "phonenumber": phonenumber,
                    "totalprice": totalprice,
                    "products": orders
                })
                .then((response) => {
                    // console.log(response.data);
                    // alert("Ordered");
                    nav("/payment")
                })
            })
        }
    return (
        <div>
            <>
                <table className="table ">
                    <thead>
                        <tr>
                            <th>CartId</th>
                            {/* <th>ProductId</th> */}
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr>
                                <td>{item.cartid}</td>
                                {/* <td>{item.productid}</td> */}
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4>Total Price:{totalprice}</h4>
                {window.localStorage.setItem('totalprice',totalprice)}
                <br></br>
        
                <form onSubmit={(e)=>handlePlaceOrder(e,address,orders,phonenumber,totalprice)}>
                <div>
                    <label for="address">Add Address Details</label>
                    <input type="text" id="address"  onChange={e => setaddress(e.target.value)}></input>
                </div>
                <div>
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone"  onChange={e => setPhonenumber(e.target.value)}></input>
                </div>
                <br></br>
                {error && <div style={{color:"red"}}>{error}</div>}
                <button type="submit">Make Payment</button>
                {/* <Payment cartItems={cartItems}/> */}
                 {/* <Link to="/payment" className="btn btn-dark mx-4 mr-auto  ">Make a Payment</Link> */}
                </form>
           
            </>
        </div>

    );
}
export default Checkout;