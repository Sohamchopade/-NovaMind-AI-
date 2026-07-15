 import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();

        try{

            const res=await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));

            navigate("/");

        }catch(err){

            alert(err.response?.data?.message);

        }

    }

    return(

<div className="auth-container">

<div className="auth-card">

<h1>Login</h1>

<form onSubmit={handleLogin}>

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
Login
</button>

</form>

<p className="auth-footer">
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

</div>

    )

}

export default Login;