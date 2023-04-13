import axios from "axios";
import { useState } from "react";
import './Signup.css';
// import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const Register =()=>{
    // let nav = useNavigate();
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [pass,setpass]=useState('');
    const [phone,setphone]=useState('');
    const[error,setError]=useState(null);
    function handleSubmit(e){
        e.preventDefault();
        if(!name.trim()){
            setError("Name is required");
            return;
        }
        if(!email.trim()){
            setError("Email is required");
            return;
        }
        const phoneRegex=/^\d{10}$/;
        if(!phoneRegex.test(phone)){
            setError("Phone number is invalid");
            return;
        }
        
        axios.post("http://localhost:8090/api/users/signup",
        {
             "name":name,
             "email":email,
             "password":pass,
             "phonenumber":phone

        }).then(res=>{
            console.log(res.data)
            if(res.status===200){
                alert(res.data)
            }
        })
        .catch(error=>{
            console.log(error)
        })

    }
    const namehandler=(event)=>{
        setname(event.target.value);
    }
    const emailhandler=(event)=>{
        setemail(event.target.value);
    }
    const passhandler=(event)=>{
        setpass(event.target.value);
    }
    const phonehandler=(event)=>{
        setphone(event.target.value);
    }
    return(
        <div className="bg-img">
            <form className="form" onSubmit={(e)=>handleSubmit(e)}>
                <h3>Register Here!</h3>
                <label for="fullname">Full Name</label>
                <input type="text" id = "fullname" autoComplete='off' value={name} onChange={namehandler}/>
                <label for="email">Email</label>
                <input type="email" id ="email" autoComplete='off' value={email} onChange={emailhandler}></input>
                <label for="password">Password</label>
                <input type="password" id="password" autoComplete='off' value={pass} onChange={passhandler}/>
                <label for="phonenumber">phonenumber</label>
                <input type="tel" id="phonenumber" autoComplete='off' value={phone} onChange={phonehandler}/>
                <br></br>
                {error && <div style={{color:"red"}}>{error}</div>}
                <button type="submit" >Register</button>
                <br></br>
                {/* onClick={(e)=>nav("/")} */}
                
                <p>Already have an account?<Link to="/login">Login here</Link></p>
            </form>
           
        </div>

    );
}
export default Register;