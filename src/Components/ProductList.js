import './products.css';
import axios from 'axios';
import { isExpired } from "react-jwt";
function ProductList({ products }) {
    if(isExpired(localStorage.getItem('jwtToken'))){
        console.log("expired");
        alert("Session Timeout Please login again");
        window.location.href="/";
    }
    const handleAddToCart = (e,productid,name,price) => {
        e.preventDefault();
        axios.get(`http://localhost:8091/loginuser/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                axios.post("http://localhost:8095/api/add", {
                    "userid": res.data,
                    "productid": productid,
                    "quantity": 1,
                    "name":name,
                    "price":price

                })
                    .then((res) => {
                        console.log(res.data);
                        alert("Products added successufully");
                    })

            })
            .catch((error) => {
                alert("you must be logged into to add items to your cart");

            });
    }   
    return (
        <div className="product-list container">
            <div className="row">
                {products.map((product) => {

                    return (
                        <div className="col-md-4 product" key={product.productid}>
                            <h2 className="title">{product.name}</h2>
                            <img src={product.imageUrl} alt={product.name} height="450px" />
                            <p>Rating: {product.rating}</p>
                            <p>{product.description}</p>
                            <span className="price">{product.price}</span><br></br><br></br>
                            <button onClick={(e) => handleAddToCart(e,product.productid,product.name,product.price)} className="button">Add to Cart</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default ProductList;
