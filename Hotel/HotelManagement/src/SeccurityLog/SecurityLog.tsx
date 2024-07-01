import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const SecurityLog = () => {
    const [securityLog,setSecurityLog] = useState<any[]>([])
    const [filterData,setFilterData] = useState<any[]>([])
    const [guestId,setGuestId] = useState<number>()
    useEffect(()=>{
        axios.get('https://localhost:44343/hotel/getsecuritylog')
        .then((resp)=>{
         setSecurityLog(resp.data)   
        })
    },[])
    function recordsByGuestId(){
        const filter = securityLog.filter((item) => {
            return item.guest_id === guestId;
        });
        if(guestId){
            setFilterData(filter)
        }else{
            alert('Enter a Guest Id')
        }
        
        
    }
    function allRecords(){
        setFilterData(securityLog);
    }
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'50px'}}>
         <Link className="topnav_links" style={{color:'red'}} to={'/admin'}><h2>Home</h2></Link>
    <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
        <h3>Guest ID :</h3>
        <input type="number" style={{padding:'10px'}} onChange={(e)=>setGuestId(Number(e.target.value))} />
        <button style={{padding:'10px'}} onClick={recordsByGuestId}>Submit</button>
    </div>
    <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
                <button style={{padding:'10px'}} onClick={allRecords}>All Records</button>
        </div>
    <div style={{border:'1px solid blue',marginTop:'50px'}}>
        <table style={{border:'1px solid'}}>
            <thead>
            <tr>
                <th>Guest Id</th>
                <th>Date</th>
                <th>Security Log</th>
                
            </tr>
            </thead>
            
            <tbody>
                {filterData.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.guest_id}</td>
                        <td>{item.time_stamp}</td>
                        <td>{item.action_performed}</td>
                    </tr>

                ))}

            </tbody>
            
        </table>

    </div>
  
</div>
  )
}

export default SecurityLog
