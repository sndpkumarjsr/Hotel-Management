import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export interface GuestType {
    guest_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    phone_number: number;
    address: string;
    password: string;
}

const Login : React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'user' | 'admin'>('user');
    const [userDetails,setUserDetails] = useState<any[]>([])
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(location.state){
            setUserType(location.state)         
        }
        
    },[])

    function Auth(){
        if(userType === 'user'){
            userAuth()
        }else if(userType === 'admin'){
            adminAuth();
        }
    }
    
    const userAuth = () => {
        axios.get(`https://localhost:44343/hotel/authuser?Email=${email}&Password=${password}`)
        .then((resp)=>{
            console.log(resp.status,'status');
            console.log(resp.data,'data');
            if(resp.status == 200 && resp.data)
                navigate('/home',{state:resp.data})
            else
                alert('Email and Password is Incorrect')
               
        })
    };

    const adminAuth = () => {
        if(email === 'admin' && password === 'admin'){
            navigate('/admin')
        }else{
            alert('Email and Password is incorrect')
        }
    };

    return (
        <div>
            
            <LoginForm 
                email={email} 
                password={password} 
                setEmail={setEmail} 
                setPassword={setPassword} 
                auth={Auth} 
                userType={userType} 
            />
            
        </div>
    );
}

export default Login