// import './About.css';
import { NavLink } from 'react-router-dom';
import { isExpired } from "react-jwt";
function About(){
    if(isExpired(localStorage.getItem('jwtToken'))){
        console.log("expired");
        alert("Session Timeout Please login again");
        window.location.href="/";
    }
    return(
                <div>
                    <div className="container py-4 my-4">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="text-dark fw-bold mb-4">About Us</h3>
                                <p>Welcome to our store,Your one-stop shop for all your retil needs.Our store offers a wide range of products at affordable prices,
                 and we are committed to providing the best possible shopping experience for our customers
            </p>
             <h4>
                 What we offer
             </h4>
            <p>
                Quality Products:We carry a wide range of products,from everyday essenials to the latest tech gadgets
                 Competitive prices:We strive to offer the best Prices possible
                 Convenient shopping:Shoponlin or in-store,with easy checkout and fast shipping options
                 Excellent customer service:Our friendly staff are always available to assist you with any questions or issues.
            </p>
            <h4>
                Our mission
            </h4>
            <p>Our mission is to provide our customers with the best possible shopping experience</p>
                                <NavLink to="/contact" className="btn btn-outline-dark">Contact Us</NavLink>
                            </div>
                            <div className="col-md-6">
                                <img src="/assets/Images/About.png" alt="About Us" height="400px" width="600px"></img>
    
                            </div>
                        </div>
                    </div>
        
                </div>
            )
    }
        
//         <div className="about">
//             <h1>About our Store</h1>
//             <p>Welcome to our store,Your one-stop shop for all your retil needs.Our store offers a wide range of products at affordable prices,
//                 and we are committed to providing the best possible shopping experience for our customers
//             </p>
//             <h2>
//                 What we offer
//             </h2>
//             <ul>
//                <li> Quality Products:We carry a wide range of products,from everyday essenials to the latest tech gadgets</li>
//                 <li>Competitive prices:We strive to offer the best Prices possible</li>
//                 <li>Convenient shopping:Shoponlin or in-store,with easy checkout and fast shipping options</li>
//                 <li>Excellent customer service:Our friendly staff are always available to assist you with any questions or issues.</li>
//             </ul>
//             <h2>
//                 Our mission
//             </h2>
//             <p>Our mission is to provide our customers with the best possible shopping experience</p>
//         </div>
//     );
// }
export default About;