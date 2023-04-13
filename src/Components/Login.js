import { useEffect, useState } from "react";
import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8091/authenticate",
            {
                "email": email,
                "password": pass
            }).then(res => {
                console.log(res.data.jwt)
                localStorage.setItem("jwtToken", res.data.jwt);
                setIsLoggedIn(true);
                console.log(isLoggedIn);
                if(res==403){
                    alert("Incorrect username or password");
                }
                else{
                    console.log("successfully logged in");
                }
                window.location.href = '/homepage';
            }
            )
    }
    // isTokenExpired('jwtToken')
    const emailhandler = (event) => {
        setemail(event.target.value);
    }
    const passhandler = (event) => {
        setpass(event.target.value);
    }

    return (
        <div className="div1">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="h3"><b>Login</b></h3>
                <label for="email"><b>Email </b></label>
                <input type="email" id="email" autoComplete='off' value={email} onChange={emailhandler}></input>
                <label for="password"><b>Password</b></label>
                <input type="password" id="password" autoComplete='off' value={pass} onChange={passhandler} />
                <button className="button" type="submit">Log In</button>
                <br></br>
                <p>Don't have an Account?<Link to="/register">Register here</Link></p>
            </form>
        </div>

    );
}
export default Login;