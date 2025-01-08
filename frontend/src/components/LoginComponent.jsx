import {useState} from 'react'
import Heading from './Heading';
import SubHeading from './SubHeading';
import Field from './Field';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';


function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function handleSubmit(){
        const data = {
            email,
            password
        }

        // Validation
        if (!email) {
            toast.error("Email is required.");
            return;
        }
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (!password) {
            toast.error("Password is required.");
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/accounts/login', data);
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

  return (
    <div className="w-[300px] p-[0.8rem]">
        <Heading>Login</Heading>
        <SubHeading>Don't have an account? <span className='cursor-pointer font-semibold' onClick={()=>{navigate('/accounts/signup')}}>Signup</span></SubHeading>
        <Field filedName={"Email"} placeholder={"xyz@gmail.com"} state={email} setState={setEmail}/>
        <Field filedName={"Password"} placeholder={"Enter your password"} state={password} setState={setPassword} inputType={'password'}/>
        <button 
        className='bg-[#0a0a0a] text-white w-full py-[0.4rem] rounded-lg'
        onClick={handleSubmit}
        >
            Login
        </button>
    </div>
  )
}

export default LoginComponent