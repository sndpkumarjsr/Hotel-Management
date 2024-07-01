import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const GuestFeedback = () => {
    const [name,setName] = useState('')
    const [feedbackDetails,setFeedbackDetails]= useState<any[]>([])
    const [filterFeedback,setFilterFeedback] = useState<any[]>([])

    useEffect(()=>{
        axios.get('https://localhost:44343/hotel/getfeedback?id=0')
        .then((resp)=>{
            setFeedbackDetails(resp.data)
        })
    },[])
    function handleAllRecord(){
        setFilterFeedback(feedbackDetails)
    }
    function fetchFeedback(){
        if(!name){
            alert('please Fill the Field')
        }else{
            const filterDetails = feedbackDetails.filter(item => {
                const fullName = item.guest_name.toLowerCase(); // Concatenate first_name and last_name with a space and convert to lowercase
                const guestNameLower = name.toLowerCase(); // Convert guestName to lowercase for case-insensitive comparison
                return (fullName.includes(guestNameLower));
            });
            if(filterDetails){
                setFilterFeedback(filterDetails)
            }else{
                alert('No User Found')
            }
        }

    }
   
    
  return (
    <div style={{border:'1px solid ', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'50px'}}>
        <Link className="topnav_links" style={{color:'red'}} to={'/admin'}><h2>Home</h2></Link>
        <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
            <h3>Guest Name :</h3>
            <input type="text" style={{padding:'10px'}} onChange={(e)=>setName(e.target.value)} />
            <button style={{padding:'10px'}} onClick={fetchFeedback}>Submit</button>
        </div>
        <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
                <button style={{padding:'10px'}} onClick={handleAllRecord}>All Records</button>
        </div>
        <div style={{border:'1px solid blue',marginTop:'50px'}}>
            <table style={{border:'1px solid'}}>
               
                <thead>
                    <tr>
                    <th>Guest Id</th>
                    <th>Guest Name</th>
                    <th>Date</th>
                    <th>Rating</th>
                    <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {filterFeedback.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.guest_id}</td>
                            <td>{item.guest_name}</td>
                            <td>{item.survey_date}</td>
                            <td>{item.rating}</td>
                            <td>{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default GuestFeedback
