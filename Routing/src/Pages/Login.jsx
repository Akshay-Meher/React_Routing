// Login.js
//   ;
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useContext, useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import LoginContext from '../components/context/LoginContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(LoginContext);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(function (response) {
                // console.log('response');
                // console.log(response.data);
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const res = userData?.some((data) => data.email === email && data.password === password);
        console.log(res);
        if (res) {
            console.log(res);
            localStorage.setItem('userLogin', JSON.stringify({
                email,
                password,
                isLogin: true
            }));
            setIsLogin(true);
            navigate('/dashboard');
        }

    }

    return (
        <div className="container login-container">
            <div className="form-container ">
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p style={{ textAlign: "center" }}>
                        <Link>Forgot password?</Link>
                    </p>
                    <button type="submit" className="btn">Login</button>
                </form>
                <p style={{ textAlign: 'center' }}>
                    Don't have an account? <Link to='/registration'>Sign-up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
