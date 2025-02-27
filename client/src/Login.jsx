import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/login", {email, password})
        .then(res => {
            console.log(res.data)
            if(res.data == "Success") {
                window.location.href = "/"
            }
            else {
                alert(res.data)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="signup_container">
            <div className="signup_form">
                <h2>Вход</h2>
                <br />
                <form onSubmit={handleSubmit} className="form_signup">
                    <div>
                        <label htmlFor="email">Электронная почта:</label> <br />
                        <input type="text" placeholder="Enter email..." 
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Пароль:</label> <br />
                        <input type="password" placeholder="********" 
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="signup_btn">Login</button>
                </form>
                <p className="form-p">Not Registered?</p>
                <Link to="/register"><button>Sign Up</button></Link>
            </div>
        </div>
    )
}

export default Login;