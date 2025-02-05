import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import LoadSpinner from '../Spinner/LoadSpinner';
import { AuthContext } from '../ContextApi/AuthContext';

const defaultForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
}

function Signup() {

    const [form, setForm] = useState(defaultForm);
    const [isVisible, setIsVisible] = useState(false);
    const { Register } = useContext(AuthContext)
    const {firstName, lastName, email, phone, password} = form;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
          const success = Register(email, password);
          if (success) {
              setForm(defaultForm);
              navigate("/login");
          }
      } catch (error) {
          console.error("Signup Error:", error);
      } finally {
          setIsLoading(false); // Ensures it runs only once
      }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
};

    
    const handleVisibility =()=> {
        setIsVisible(!isVisible);
    }


  return (
    <div className='form-container'>
        <h3>SignUp Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Full Name' name='firstName' value={firstName} onChange={handleChange} required />
        <input type="text" placeholder='Enter Your Full Nmae' name='lastName' value={lastName} onChange={handleChange} required />
        <input type="text" placeholder='Enter Your Email Address' name='email' value={email} onChange={handleChange} required />
        <input type="text" placeholder='Enter Your Phone Number' name='phone' value={phone} onChange={handleChange} required />
        <span>
        <input type={isVisible ? 'text' : 'password'} placeholder='Enter Your Password' name='password' value={password} onChange={handleChange} required />
        <div className="wrap" onClick={handleVisibility}>
            {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        </span>
        <p onClick={()=> navigate('/login')}>Already have an account? <Link to={'/login'} style={{ color: "red" }}>Login</Link></p>
        <button disabled={isLoading}>
          {isLoading ? <LoadSpinner/> : "SUBMIT"}
        </button>
      </form>

    </div>
  )
}

export default Signup;
