import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const SignUp = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [gender,setGender] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState<number>()
    const [address,setAddress] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value); // Update the gender state when the radio button changes
      };

      const navigate = useNavigate();

      function CreateUser(){
        if(firstName && gender && email && phone && password && confirmPassword && address){

            if(password === confirmPassword){
                const formData = new FormData();
                formData.append('first_name',firstName)
                formData.append('last_name',lastName)
                formData.append('gender',gender)
                formData.append('email',email)
                formData.append('phone_number',phone)
                formData.append('address',address)
                formData.append('password',password)

                axios.post('https://localhost:44343/hotel/addupdateguest',formData)
                .then((resp)=>{
                    if(resp.data.success){
                        navigate('/')
                    }
                })
            }else{
                alert('Password and Confirm Password Not Matched')
            }

        }else{
            alert('Please Fill the Block')
        }

      }
      
 
    return (
        <div>
            <div className='sign_up_page main'>
                <h1 className="sign_up_heading head">Sign Up</h1>
                <label>
                    <input className='input' type='text' placeholder='Enter First Name' onChange={(e)=>{setFirstName(e.target.value)}} />
                </label>
                <label>
                    <input className='input' type='text' placeholder='Enter Last Name' onChange={(e)=>{setLastName(e.target.value)}} />
                </label>
                <label>
                    <h4>Gender : </h4>
                    <input type='radio' name='gender' value={'Male'}  checked={gender === 'Male'} onChange={handleGenderChange}  /> Male
                    <input type="radio" name='gender' value={'Female'}  checked={gender === 'Female'} onChange={handleGenderChange}  /> Female
                </label>
                <label>
                    <input type="email" placeholder='Enter Email' className='input' onChange={(e)=>{setEmail(e.target.value)}} />
                </label>
                <label>
                    <input type="number" placeholder='Enter Mobile Number' className='input' onChange={(e)=>{setPhone(Number(e.target.value))}} />
                </label>
                <label>
                    <input type="text" placeholder='Enter Address' className='input' onChange={(e)=>{setAddress(e.target.value)}} />
                </label>
                <label>
                    <input type="password" placeholder='Enter password' className='input' onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                <label>
                    <input type="password" placeholder='Enter Confirm Password' className='input' onChange={(e)=>setConfirmPassword(e.target.value)} />
                </label>
                <button className='btn' onClick={CreateUser}>Submit</button>
                <h4>If You Have Already Account!</h4>
                <Link to={'/login'}state={'user'}>Log-In</Link>
            </div>
        </div>
    )
}

export default SignUp