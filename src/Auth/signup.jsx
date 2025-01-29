import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import axios from 'axios';
import LoadSpinner from '../Spinner/LoadSpinner';

const defaultForm = {
    fullName: '',
    email: '',
    phone: '',
    password: ''
}

function Signup() {

    const [form, setForm] = useState(defaultForm);
    const [isVisible, setIsVisible] = useState(false);
    const {fullName, email, phone, password} = form;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()


    const handleSubmit = async (e)=> {
        e.preventDefault();
        setIsLoading(true);
        try {
          const response = await axios.post('https://getform.io/f/aqooqwpa', form,{
            headers: 
            {
              'Content-type' : 'application/json',
          }
        });
        if (response.status !== 200) {
          throw new Error('Request failed')
        }
        console.log(form);
        setIsLoading(false);
        setForm(defaultForm);
        navigate("/")

        } catch (error) {
          console.log(error.message);
          setIsLoading(false)
        }
    };

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setForm({...form, [name] : value})
    };
    
    const handleVisibility =()=> {
        setIsVisible(!isVisible);
    }


  return (
    <div className='form-container'>
        <h3>SignUp Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Full Nmae' name='fullName' value={fullName} onChange={handleChange} required />
        <input type="text" placeholder='Enter Your Email Address' name='email' value={email} onChange={handleChange} required />
        <input type="text" placeholder='Enter Your Phone Number' name='phone' value={phone} onChange={handleChange} required />
        <span>
        <input type={isVisible ? 'text' : 'password'} placeholder='Enter Your Password' name='password' value={password} onChange={handleChange} required />
        <div className="wrap" onClick={handleVisibility}>
            {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        </span>
        <p onClick={()=> navigate('login')}>Don't have an accout yet? Login</p>
        <button disabled={isLoading}>
          {isLoading ? <LoadSpinner/> : "SUBMIT"}
        </button>
      </form>

    </div>
  )
}

export default Signup;
