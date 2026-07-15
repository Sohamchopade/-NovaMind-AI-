 import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register(){

const[username,setUsername]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const navigate=useNavigate();

const handleRegister=async(e)=>{

e.preventDefault();

try{

await axios.post(
"http://localhost:3000/api/auth/register",
{
username,
email,
password
}
);

alert("Registration Successful");

navigate("/login");

}catch(err){

alert(err.response?.data?.message);

}

}

return(

<div className="auth-container">

<div className="auth-card">

<h1>Create Account</h1>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button type="submit">
Register
</button>

</form>

<p className="auth-footer">
Already have an account?
<Link to="/login"> Login</Link>
</p>

</div>

</div>

)

}

export default Register;