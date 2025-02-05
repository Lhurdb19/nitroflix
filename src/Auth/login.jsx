import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext';
import { useContext } from 'react';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import LoadSpinner from '../Spinner/LoadSpinner';


const defaultForm = {
    email: "",
    password: ""
}

function Login() {

    const {Signin} = useContext(AuthContext);
    const [formField, setFormField] = useState(defaultForm);
    const {email, password} = formField;
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleVisible = ()=> {
        setIsVisible(!isVisible)
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormField((prevForm) => ({ ...prevForm, [name]: value }));
  };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
          const success = await Signin(email, password); // Ensure async behavior
          if (success) {
              setFormField(defaultForm);
              navigate("/");
          }
      } catch (error) {
          console.error("Login Error:", error);
      } finally {
          setIsLoading(false); // Ensure this runs last
      }
  };
  

  return (
    <div className='form-container'>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Enter Your Email'  name='email' value={email} onChange={handleChange} required />

        <span>
        <input type={isVisible ? 'text' : 'password'} placeholder='Enter Your Password' name='password' value={password} onChange={handleChange} required />
        <div className="wrap" onClick={handleVisible}>
            {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        </span>
        <button disabled={isLoading}>
          {isLoading ? <LoadSpinner/> : "LOG IN"}
        </button>
        <p onClick={()=> navigate('/signup')}>Don't have an account yet? Sign up</p>
      </form>
    </div>
  )
}

export default Login;
