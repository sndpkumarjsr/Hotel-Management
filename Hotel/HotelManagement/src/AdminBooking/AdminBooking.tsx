import axios from "axios"
import { useEffect, useState } from "react"
import { GuestType } from "../Login/Login"
import { Link } from "react-router-dom"


const AdminBooking = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState<number>()
    const [address, setAddress] = useState('')
    const [checkInDate, setCheckInDate] = useState(getCurrentDate());
    const [checkOutDate, setCheckOutDate] = useState('')
    const [roomType, setRoomType] = useState('')


    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value); // Update the gender state when the radio button changes
    };
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

    function handleBooking() {
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('gender', gender)
        formData.append('email', email)
        formData.append('phone_number', phone)
        formData.append('address', address)
        formData.append('password', (firstName)+'@123')
        axios.post(`https://localhost:44343/hotel/addadminreservation?room_type=${roomType}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}&reservation_status=Booking`,formData)
        .then((resp)=>{
            if(resp.data.success){
                alert('Room Booked')
            }
        })
    }

    return (
        <div className="main1">
             <Link className="topnav_links" style={{color:'red'}} to={'/admin'}><h2>Home</h2></Link>
            <div className="Booking main">
                <h1 className="Booking_heading head">Booking Rooms</h1>
                <label>
                    <h3>Guest First Name:</h3>
                    <input type="text" className="input" onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label>
                    <h3>Guest Last Name:</h3>
                    <input type="text" className="input" onChange={(e) => setLastName(e.target.value)} />
                </label>
                <label>
                    <h4>Gender : </h4>
                    <input type='radio' name='gender' value={'Male'} checked={gender === 'Male'} onChange={handleGenderChange} /> Male
                    <input type="radio" name='gender' value={'Female'} checked={gender === 'Female'} onChange={handleGenderChange} /> Female
                </label>
                <label>
                    <h3>Email :</h3>
                    <input type="email" className='input' onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <label>
                    <h3>Mobile Number:</h3>
                    <input type="number" className='input' onChange={(e) => { setPhone(Number(e.target.value)) }} />
                </label>
                <label>
                    <h3>Address:</h3>
                    <input type="text" placeholder='Enter Address' className='input' onChange={(e) => { setAddress(e.target.value) }} />
                </label>
                <label>
                    <h3>CheckIn Date:</h3>
                    <input type="date" id="arrivalDate" name="arrivalDate" className="input" min={getCurrentDate()} onChange={(e) => setCheckInDate(e.target.value)} />
                </label>
                <label htmlFor="">
                    <h3>CheckOut Date:</h3>
                    <input type="date" id="departureDate" name="departureDate" min={checkInDate} className="input" onChange={(e) => setCheckOutDate(e.target.value)} />
                </label>
                <label htmlFor="roomType" ><h3>Room Type:</h3>
                    <select className="input" id="roomType" name="roomType" onChange={(e) => setRoomType(e.target.value)} >
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

export default AdminBooking