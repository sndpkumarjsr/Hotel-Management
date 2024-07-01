import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const GuestDetails = () => {
    const [userDetails,setUserDetails] = useState<any[]>([])
    const [filterUser,setFilterUser] = useState<any[]>([])
    const [guestName,setGuestName] = useState('');
    const [phNumber,setPhNumber] = useState<number>()
    useEffect(()=>{
        axios.get('https://localhost:44343/hotel/getguest?id=0')
        .then((resp)=>{
            setUserDetails(resp.data)
        })
    },[])

    function fetchDetail(){
        if(!guestName && !phNumber){
            alert('please Fill the Field')
        } else if(!guestName){
            alert('please Fill the Name Field')
        }else if(!phNumber){
            alert('please Fill the Mobile Number Field')
        }else{
            const filterDetails = userDetails.filter(item => {
                const fullName = ((item.first_name || '') + ' ' + (item.last_name || '')).toLowerCase(); // Concatenate first_name and last_name with a space and convert to lowercase
                const guestNameLower = guestName.toLowerCase(); // Convert guestName to lowercase for case-insensitive comparison
                return (fullName.includes(guestNameLower) || (item.first_name || '').toLowerCase().includes(guestNameLower) || (item.last_name || '').toLowerCase().includes(guestNameLower)) && item.phone_number === phNumber;
            });
            
            
             if(filterDetails){
                 setFilterUser(filterDetails)
             }else{
                    alert('No User Found')
             }
        }
    }
        
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'50px'}}>
         <Link className="topnav_links" style={{color:'red'}} to={'/admin'}><h2>Home</h2></Link>
        <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
            <h3>Guest Name : </h3>
            <input type="text" style={{padding:'10px'}} onChange={(e)=>setGuestName(e.target.value)} />
            <h3>Guest Mobile Number : </h3>
            <input type="number" style={{padding:'10px'}} onChange={(e)=>setPhNumber(Number(e.target.value))} />
            <button style={{padding:'10px'}} onClick={fetchDetail}>Submit</button>
        </div>
        <div style={{border:'1px solid blue',marginTop:'50px'}}>
            <table style={{border:'1px solid'}}>
                
                <thead>
                    <tr>
                    <th>Guest Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                
                </tr>
                </thead>
                <tbody>
                  {
                    filterUser.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.guest_id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_number}</td>
                            <td>{item.address}</td>
                        </tr>
                    )
                  )}
                </tbody>    
            </table>

        </div>
      
    </div>
  )
}

export default GuestDetails
