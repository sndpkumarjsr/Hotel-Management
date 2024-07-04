import { useEffect, useState } from "react"
import { GuestType } from "../Login/Login"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { differenceInDays } from 'date-fns';

interface roomType{
    roomtype:string;
    rate:number;
    total_num_room:number
}
const Booking = () => {
    const [user,setUser] = useState<GuestType>()
    const [roomType,setRoomType] = useState('')
    const location = useLocation()
    const [checkInDate,setCheckInDate] = useState(getCurrentDate());
    const [checkOutDate,setCheckOutDate] = useState('')
    const [availability,setAvailabilty] = useState<any>()


    function getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10)
        month = '0' + month;
      if (day < 10)
        day = '0' + day;
      return `${year}-${month}-${day}`;
    }

    useEffect(()=>{
        if(location.state){
            setUser(location.state)
        }
    },[location])

    function handleBooking(){
      axios.get(`https://localhost:44343/hotel/getroomdetails?room_type=${roomType}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}`)
    .then((resp)=>{
      setAvailabilty(resp.data)
    })
    const checkOutDateObj = new Date(checkOutDate);
    const checkInDateObj = new Date(checkInDate);
    
    // Calculate the difference in days
    const differenceDays = differenceInDays(checkOutDateObj, checkInDateObj);

      if(availability[0].total_num_room > differenceDays){
        const formData = new FormData()
        formData.append("guest_id",user.guest_id)
        formData.append("room_type",roomType)
        formData.append("check_in_date",checkInDate)
        formData.append("check_out_date",checkOutDate)
        formData.append("reservation_status",'Booking')
        axios.post(`https://localhost:44343/hotel/addupdatereservation`,formData)
        .then((resp)=>{
          if(resp.data.success){
            alert('Room Booked')
          }else(
            alert('Something Error')
          )
          
        })
      }else{
        alert('Room Not Available')
      }
    }

  return (
    <div className="main1">
        <div className="Booking main">
            <h1 className="Booking_heading head">Booking Rooms</h1>
            <label>
                <h3>Guest Id:</h3>
                <input type="number" value={user?.guest_id} readOnly className="input" />
            </label>
            <label>
              <h3>CheckIn Date:</h3>
              <input type="date" id="arrivalDate"  name="arrivalDate"  className="input" min={getCurrentDate()} onChange={(e)=>setCheckInDate(e.target.value)} />
            </label>
            <label htmlFor="">
              <h3>CheckOut Date:</h3>
              <input type="date" id="departureDate" name="departureDate" min={checkInDate} className="input" onChange={(e)=>setCheckOutDate(e.target.value)} />
            </label>
            <label htmlFor="roomType" ><h3>Room Type:</h3>
            <select className="input" id="roomType" name="roomType" onChange={(e)=>setRoomType(e.target.value)} >
              <option>Select</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Triple Room">Triple Room</option>
              <option value={"Quad Room"}>Quad Room</option>
            </select>
            </label>
            <button className="btn" onClick={handleBooking}>Submit</button>
        </div>
    </div>
  )
}

export default Booking