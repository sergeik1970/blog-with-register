import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from './App';
import axios from 'axios';


const Navbar = () => {
    const user = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res => {
            if (res.data === 'Success')
            navigate(0)
        }).catch(err => {console.log(err)});
    }

    console.log(user);
    return (
        <nav className='navbar'>
            <div className="nav-content">
                <h3>MERN Blog App</h3>
                <div>
                    <a href="/" className='link'>Home</a>
                    {
                        user.username ?
                        <Link to="/create" className='link'>Create</Link>
                        : <></>
                    }
                    <a href="" className='link'>Contact</a>
                </div>
                {
                    user.username ?
                    <div>
                        <span>{user.username}</span>&nbsp;
                        <input type="button" onClick={handleLogout} value='Logout' className='btn_input'/>
                    </div>
                    :
                    <div><Link to="/register" className="link">Register/Login</Link></div>
                }
            </div>
        </nav>
    )
}

export default Navbar;