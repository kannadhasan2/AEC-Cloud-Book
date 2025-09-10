import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Register = () => {
  const [registerNo, setRegisterNo] = useState('');
  const [username, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [registerNoError, setRegisterNoError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwtToken');
  
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  const getUserName = (event) => {
    setUserName(event.target.value);
  };

  const getRegisterNo = (event) => {
    setRegisterNo(event.target.value);
  };

  const getDateOfBirth = (event) => {
    setDateOfBirth(event.target.value);
  };

  const getDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (registerNo.startsWith('5104')) {
      if (registerNo.length === 12) {
        if (dateOfBirth.length === 10) {
          const url = 'https://aec-cloud-book-oza4.vercel.app/register';
          const student = { registerNo, dateOfBirth, email, department, username };
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
          };
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            navigate('/login');
          } else {
            setRegisterNoError(data.error_msg);
          }
        } else {
          setDateOfBirthError('Invalid Date Of Birth');
          setRegisterNoError('');
        }
      } else {
        setRegisterNoError('Register Number Must Have 12 Digits');
      }
    } else {
      setRegisterNoError('Register No starts with 5104');
    }
  };

  return (
    <div className="login">
      <img
        src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1728577172/b68a25a6d28597b50ccbb1e12f7c2401_vm9hgt.jpg"
        alt="login image"
        className="login__img"
      />
      <p className='login__button--top-right-text hide-on-small'>Already Have An Account!</p>
      <button className="login__button--top-right hide-on-small" onClick={() => navigate('/login')}>
        Login
      </button>
      <form onSubmit={submitForm} className="login__form">
        <h1 className="login__title">Register</h1>
        <div className="login__content">
          <div className="login__box">
            <div className="login__box-input">
              <input
                onChange={getUserName}
                type="text"
                required
                className="login__input"
                id="login-username"
                placeholder=" "
              />
              <label htmlFor="login-username" className="login__label">User Name</label>
            </div>
          </div>
          <div className="login__box">
            <div className="login__box-input">
              <input
                onChange={getRegisterNo}
                type="text"
                required
                className="login__input"
                id="login-register-number"
                placeholder=" "
              />
              <label htmlFor="login-register-number" className="login__label">Register Number</label>
            </div>
          </div>
          <div className="login__box">
            <div className="login__box-input">
              <input
                onChange={getDateOfBirth}
                type="text"
                required
                className="login__input"
                id="login-dob"
                placeholder=" "
              />
              <label htmlFor="login-dob" className="login__label">DD-MM-YYYY</label>
            </div>
          </div>
          <div className="login__box">
            <div className="login__box-input">
              <input
                onChange={getDepartment}
                type="text"
                required
                className="login__input"
                id="login-department"
                placeholder=" "
              />
              <label htmlFor="login-department" className="login__label">Department</label>
            </div>
          </div>
          <div className="login__box">
            <div className="login__box-input">
              <input
                onChange={getEmail}
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
              />
              <label htmlFor="login-email" className="login__label">Email</label>
            </div>
          </div>
        </div>
        <button type="submit" className="login__button">Register</button>
        {registerNoError !== '' && <p className='error'>*{registerNoError}</p>}
        {dateOfBirthError !== '' && <p className='error'>*{dateOfBirthError}</p>}
        <p className="login__register1">
                    Already have an account? <button className='register-text' onClick={() => navigate('/login')}>Login</button>
                </p>
      </form>
      
    </div>
  );
};

export default Register;
