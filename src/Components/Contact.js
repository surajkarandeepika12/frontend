import { isExpired } from "react-jwt";
function Contact() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        console.log("expired");
        alert("Session Timeout Please login again");
        window.location.href="/";
    }
    return (
        <>
            
            <div style={{"padding":"50px"}}>
                <p>If you have any queries please mail us supportteam@retail.in</p>
                <p>Contact Details are:+91 9676767687,+113445676765</p>

            </div>
            <div className="col-md-6" style={{"padding":"50px"}}>
                <img src="/assets/Images/contactt.jpg" alt="About Us" height="300px" width="450px"></img>

            </div>
        </>
    );
}
export default Contact;