import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './products.css';
import { Button } from 'react-bootstrap';
import './SearchItem.css';
function SearchItem() {
    const [query, setQuery] = useState('');
    const [product, setProduct] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8097/search/productname/${query}`);
            setProduct(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
            // handle error
        }
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
        <div >

            
            <form  onSubmit={handleSubmit}>
                <label htmlFor='searchitem'>Search</label>
                <input type="text" id='searchitem' value={query} onChange={(event) => setQuery(event.target.value)} />
                <button type="submit">Search</button>
            </form>
            
            
            <div className="product container">
                <div className='row'>
                {product.map((p) => (
                    <div className='col-md-4 product' key={p.id}>
                        <img src={p.imageUrl} alt={p.name} />
                        <div>
                            <h2>{p.name}</h2>
                            <p>{p.description}</p>
                            <br></br>
                            <span className="price">{p.price}</span>
                            <br></br>
                            <button onClick={(e) => handleAddToCart(e,p.productid,p.name,p.price)} className="button">Add to Cart</button>
                        </div>
                        
                    </div>
                    

                ))}
            </div>
            </div>
        </div>
    );
}

export default SearchItem;