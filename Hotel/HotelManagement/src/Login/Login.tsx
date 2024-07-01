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
    const [filterData,setFilterData] = useState<any[]>([])
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
        axios.get('https://localhost:44343/hotel/getguest?id=0')
        .then((resp)=>{
            setUserDetails(resp.data) 
        })
        const filter = userDetails.filter((item)=>{
            return item.email === email && item.password === password
        })
        if(filter.length === 1){
            navigate('/home',{state:filter})
        }else{
            alert('Email and Password is incorrect')
        }
        
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