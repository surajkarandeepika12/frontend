import { useState, useEffect } from "react";
import axios from "axios";
function Orders() {
    const [order, setorders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            axios.get(`http://localhost:8091/loginuser/${localStorage.getItem('jwtToken')}`)
                .then(res => {
                    axios.get(`http://localhost:8096/orders/getorders/${res.data}`)
                    .then(response => {
                        setorders(response.data);
                    }).finally(
                        console.log(order)
                    )
                })
        }
        fetchData();
    }, []);

    return (
        <>
            <table className="table ">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>TotalPrice</th>
                    </tr>
                </thead>
                <tbody>
                {
                        order.map(ord =>
                            ((ord.products).split(",")).map(o =>
                                
                                <tr>
                                    <td>{ord.id}</td>
                                    <td>{o.split("-")[0]}</td>
                                    <td>{o.split("-")[1]}</td>
                                    <td>{o.split("-")[2]}</td>
                                    <td>{ord.totalprice}</td>
                                </tr>

                            )

                        )
                    }
                </tbody>
            </table>
        </>
    )


}
export default Orders;