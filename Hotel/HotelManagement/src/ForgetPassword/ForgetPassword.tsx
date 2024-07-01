import axios from "axios"
import { useEffect, useState } from "react"
import { GuestType } from "../Login/Login"
import { useNavigate } from "react-router-dom"


const ForgetPassword = () => {
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState<number | null>(null)
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [data,setDate] = useState<GuestType[]>([])

    useEffect(()=>{
        axios.get('https://localhost:44343/hotel/getguest?id=0')
        .then((resp)=>{
            setDate(resp.data)
        })
    },[])

    const navigate = useNavigate();
 
    function ChangePassword(){
        console.log(validate(email,mobile));
        
        if(validate(email,mobile)){
            if(password === confirmPassword){
                axios.post(`https://localhost:44343/hotel/updatepassword?email=${email}&mobile=${mobile}&password=${password}`)
            .then((resp)=>{
                if(resp.data.success){
                    setEmail('')
                    setMobile(null)
                    setPassword('')
                    setConfirmPassword('')
                    navigate('/')
                }else{
                    alert('Enter Password and Confirm Password')
                }
            })
            }else{
                alert('Password and Confirm Password not Matched')
            }
        }else{
            alert('Invalid Email and Mobile')
        }
        
    }
    function validate(email:string,mobile:number):boolean{
        return data.some(user => user.email === email && user.phone_number === mobile)
    }


    return (
        <div>
            <div className="forget_password main">
                <h1 className="sign_up_heading head">Forget Password</h1>
                <label>
                    <input type="email" placeholder='Enter Email' className='input' onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label>
                    <input type="number" placeholder='Enter Mobile Number' className='input' onChange={(e)=>{setMobile(Number(e.target.value))}}/>
                </label>
                <label>
                    <input type="password" placeholder='Enter password' className='input' onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                <label>
                    <input type="password" placeholder='Enter Confirm Password' className='input' onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                </label>
                <button className='btn' onClick={ChangePassword}>Submit</button>
            </div>
        </div>
    )
}

export default ForgetPassword