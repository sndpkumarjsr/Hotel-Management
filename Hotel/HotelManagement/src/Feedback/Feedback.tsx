import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { GuestType } from "../Login/Login";
import axios from "axios";


const Feedback = () => {
    const [user,setUser] = useState<GuestType>()
    const [date,setDate] = useState('')
    const [rating,setRating] = useState<number>()
    const [comment,setComment] = useState('')

    const loction = useLocation()
    useEffect(()=>{
      if(loction.state){
        setUser(loction.state[0])
        const newDate = new Date();
        const recentDate = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()
        setDate(recentDate)
      }
    },[])

    function Submit(){
      if(rating && comment){
      if(Number(rating) >0 && Number(rating) <=5 && comment != null){
        const formData = new FormData();
        formData.append('guest_id',user?.guest_id)
        formData.append('survey_date',date)
        formData.append('rating',rating)
        formData.append('comment',comment)

        axios.post('https://localhost:44343/hotel/addfeedback',formData)
        .then((resp)=>{ 
          
          if(resp.data.success){
            setComment('')
            alert('Submitted')
          }
        })
      }else{
        alert('Rating should be in parameter')
      }
    }else{
      alert('Please Fill Field')
    }
    }
    
  return (
    <div className="main1">
        <div className="Feedback main">
            <h1 className="Feedback_heading head">Feedback</h1>
            <label>
                <h3>Guest Id:</h3>
                <input type="number" value={user?.guest_id} readOnly className="input" />
            </label>
            <label>
              <h3>Date:</h3>
                <input className="input" type="text" value={date} readOnly />
            </label>
            <label>
              <h3>Rating: (Out of 5)</h3>
                <input className="input" type="number" max={5} min={0} maxLength={1} onChange={(e)=>setRating(Number(e.target.value))}/>
            </label>
            <label>
              <h3>Comment:</h3>
                <input className="input" type="text"  onChange={(e)=>{setComment(e.target.value)}}/>
            </label>
            <button className="btn" onClick={Submit}>Submit</button>
        </div>
    </div>
  )
}

export default Feedback