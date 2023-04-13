import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function Payment() {
    const [payment, setPayment] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:8089/loginuser/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                axios.post(`http://localhost:9005/payment/pay`, {
                    "userid": res.data,
                    "totalprice": window.localStorage.getItem('totalprice'),
                })
                    .then(response => {
                        setPayment(response.data);
                    })
                    .finally(
                        console.log(payment)
                    )
            })
    }, []);
    // const onclickpay =(e)=>{
    //     <div>
    //     <h4>Payment Successful</h4>
    //     <p>
    //      Your Order is Confirmed
    //     </p>
    //     </div>



    // }


    return (
        <div>
            <h5 style={{ padding: "20px" }}>Payment Successful</h5>
            <h5>Order Confirmed</h5>
            <br></br>
            {/* <button onClick = {e=>onclickpay(e)} type="submit">Make Payment</button> */}
            <div className="col-md-6">
                <img src="/assets/Images/thanks.jpg" alt="About Us" height="300px" width="400px"></img>

            </div>
        </div>

    );
}
export default Payment;