import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${apiUrl}register`, { username, email, password })
        .then(res => navigate("/login"))
        .catch(err => 
            {alert("Registration failed. Please try again.")
            console.log(err)})
        
    }

    return (
        <div className="signup_container">
            <div className="signup_form">
                <h2>Регистрация</h2>
                <br />
                <form onSubmit={handleSubmit} className="form_signup">
                    <div>
                        <label htmlFor="name">Имя:</label> <br />
                        <input type="text" placeholder="Введите имя..."
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="email">Электронная почта:</label> <br />
                        <input type="email" placeholder="Введите почту..." 
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Пароль:</label> <br />
                        <input type="password" placeholder="********" 
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="signup_btn" disabled={!username || !email || !password}>Зарегистрироваться</button>
                </form>
                <p className="form-p">Уже есть аккаунт?</p>
                <Link to="/login"><button>Вход</button></Link>
            </div>
        </div>
    )
};

export default Register;