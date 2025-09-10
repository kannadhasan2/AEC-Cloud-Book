import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Login = () => {
    const [registerNo, setRegisterNo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [registerNoError, setRegisterNoError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const navigate = useNavigate();

    const getRegisterNo = (event) => {
        setRegisterNo(event.target.value);
    };

    const getDateOfBirth = (event) => {
        setDateOfBirth(event.target.value);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        
        
        if (registerNo.startsWith("5104")) {
            if (registerNo.length === 12) {
                if (dateOfBirth.length === 10) {
                    const url = "https://aec-cloud-book-backend.vercel.app/login";
                    const student = { registerNo, dateOfBirth };
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(student)
                    };
                    const response = await fetch(url, options);
                    const data = await response.json();
                    console.log(data)
                    if (response.ok) {
                        const jwtToken = data.jwt_token;
                        Cookies.set("jwtToken", jwtToken, { expires: 30 });
                        navigate("/",{replace:true}); 
                    } else {
                        setRegisterNoError(data.error_msg);
                    }
                } else {
                    setDateOfBirthError("Invalid Date Of Birth");
                }
            } else {
                setRegisterNoError("Register Number Must Have 12 Digits");
            }
        } else {
            setRegisterNoError("Register No starts with 5104");
        }
    };

    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
        return <Navigate to="/" />; 
    }

    return (
        <div className="login">
            <img src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1728577172/b68a25a6d28597b50ccbb1e12f7c2401_vm9hgt.jpg" alt="login" className="login__img" />

            <form onSubmit={submitForm} className="login__form">
                <h1 className="login__title">Login</h1>

                <div className="login__content">
                    <div className="login__box">
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input onChange={getRegisterNo} value={registerNo} type="text" required className="login__input" id="login-email" placeholder=" " />
                            <label htmlFor="login-email" className="login__label">Register Number</label>
                        </div>
                    </div>

                    <div className="login__box">
                        <i className="ri-lock-2-line login__icon"></i>
                        <div className="login__box-input">
                            <input onChange={getDateOfBirth} value={dateOfBirth} type="password" required className="login__input" id="login-pass" placeholder=" " />
                            <label htmlFor="login-pass" className="login__label">DD-MM-YYYY</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="login__button">Login</button>

                <p className="login__register">
                    {registerNoError !== "" && <p className='error'>*{registerNoError}</p>}
                    {dateOfBirthError !== "" && <p className='error'>*{dateOfBirthError}</p>}
                    Don't have an account? <button className='register-text' onClick={() => navigate('/register')}>Register</button>
                </p>
            </form>
        </div>
    );
};

export default Login;
