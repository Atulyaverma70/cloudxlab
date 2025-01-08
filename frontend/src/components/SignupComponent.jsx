import { useState } from "react"
import Button from "./Button"
import Field from "./Field"
import Heading from "./Heading"
import SubHeading from "./SubHeading"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import {toast} from 'sonner'

function SignupComponent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    async function handleSubmit(){
      const data = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      }

      if (firstName.trim() === "") {
        toast.error("First name is required.");
        return;
      }
  
      if (lastName.trim() === "") {
        toast.error("Last name is required.");
        return;
      }
  
      if (email.trim() === "") {
        toast.error("Email is required.");
        return;
      }
  
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
  
      if (phoneNumber.trim() === "") {
        toast.error("Phone number is required.");
        return;
      }
  
      if (!phoneRegex.test(phoneNumber)) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }
  
      if (password.trim() === "") {
        toast.error("Password is required.");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }
  
      
      try {
        const res = await axios.post('http://localhost:3000/accounts/signup', data);
        navigate('/accounts/login');
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }

  return (
    <div className="w-[300px] p-[0.8rem]">
        <Heading>Create an account</Heading>
        <SubHeading>Already have an account? <span className="cursor-pointer font-semibold" onClick={()=>{navigate('/accounts/login')}}>Login</span></SubHeading>
        <Field filedName={"FirstName"} placeholder={"Enter your first name"} state={firstName} setState={setFirstName} inputType={"text"}/>
        <Field filedName={"LastName"} placeholder={"Enter your last name"} state={lastName} setState={setLastName} inputType={"text"}/>
        <Field filedName={"Email"} placeholder={"xyz@gmail.com"} state={email} setState={setEmail} inputType={"email"}/>
        <Field filedName={"PhoneNumber"} placeholder={"Enter your phone number"} state={phoneNumber} setState={setPhoneNumber} inputType={"text"}/>
        <Field filedName={"Password"} placeholder={"Enter your password"} state={password} setState={setPassword} inputType={"password"}/>
        <button 
        className='bg-[#0a0a0a] text-white w-full py-[0.4rem] rounded-lg mt-[0.8rem]'
        onClick={handleSubmit}
        >
            Signup
        </button>
    </div>
  )
}

export default SignupComponent;