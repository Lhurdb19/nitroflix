import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
        const {name, value} = e.target;
        setFormField({...formField, [name] : value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        const fetchApi = await fetch("", {
          method : 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formField),
        });
        const response = await fetchApi.json();
        if (!response.ok) {
          throw new Error(response.message)
        }
          console.log(formField);
          setIsLoading(false);
          Signin();
          setFormField(defaultForm)
          navigate('/')

        } catch (error) {
          console.log(error.message);
          setIsLoading(false)
        }
    };

  return (
    <div className='form-container'>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Email'  name='email' value={email} onChange={handleChange} required />

        <span>
        <input type={isVisible ? 'text' : 'password'} placeholder='Enter Your Password' name='password' value={password} onChange={handleChange} required />
        <div className="wrap" onClick={handleVisible}>
            {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        </span>
        <button disabled={isLoading}>
          {isLoading ? <LoadSpinner/> : "LOG IN"}
        </button>
        <p onClick={()=> navigate('signup')}>Don't have an accout yet? Signup</p>
      </form>
    </div>
  )
}

export default Login;
