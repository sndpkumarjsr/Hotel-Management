import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { GuestType } from "../Login/Login"
import axios from "axios"


const GuestBill = () => {
    const [user,setUser] = useState<GuestType>()
    const [reservation,setResrvation] = useState<any[]>([])
    const [guestId,setGuestId] = useState(0)
    const [date,setDate] = useState(getCurrentDate())
    const [serviceCharges,setServiceCharges] = useState<number>()
    const [totalRoomCharges,setTotalRoomCharges] = useState<number>()
    const [totalAmount,setTotalAmount]=useState<number>()
    const location = useLocation()

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
            setUser(location.state[0])
            setGuestId(location.state[0].guest_id)  
        }
        
    },[])
    useEffect(()=>{
      axios.get(`https://localhost:44343/hotel/getreservationbyguestid?id=${guestId}`)
        .then((resp)=>{
          setResrvation(resp.data) 
        })

    },[guestId,user])
    
    
    function CalculateTotalAmount() {
      const filterData = reservation.filter((item) => {
        return item.reservation_status !== 'Booked';
      });
      console.log('filterData',filterData);
      setServiceCharges(500 * Number(filterData.length));
      const promises = filterData.map((currentValue) => {
        return Amount(currentValue.room_type, currentValue.check_in_date, currentValue.check_out_date);
      });
      console.log(promises,'prom');
      
      return Promise.all(promises)
    .then((values) => {
        let total = 0; // Initialize total

        // Iterate over each array in values
        values.forEach(array => {
            // If array is an array and has at least one item
            if (Array.isArray(array) && array.length > 0) {
                // Iterate over each item in the array
                array.forEach(item => {
                    // Assuming the rate value is in the item
                    const rate = item.rate;
                    console.log(rate , 'rate');
                    
                    if (typeof rate === 'number' && !isNaN(rate)) {
                        total += rate; // Add rate to total
                    } else {
                        console.warn('Invalid rate value:', rate);
                    }
                });
            } else {
                console.warn('Invalid response:', array);
            }
        });

        console.log("Total:", total); // Logging total amount
        setTotalRoomCharges(total);
        return total;
    })
    .catch(error => {
        console.error('Error while calculating total:', error);
        return 0; // Return 0 if there's an error
    });

        
      
    }
    
    function Amount(room_type, check_in_date, check_out_date) {
      return axios.get(`https://localhost:44343/hotel/getroomdetails?room_type=${room_type}&check_in_date=${check_in_date}&check_out_date=${check_out_date}`)
        .then((resp) => {
          // Assuming resp.data is an array with an object containing the rate
          return resp.data;
        })
        .catch((error) => {
          console.error('Error fetching room details:', error);
          throw error;
        });
    }
    
    function TotalBill() {
      if(Number(totalRoomCharges) > 0){
     
      CalculateTotalAmount()
        .then((totalRoomCharges) => {
          const total = Number(totalRoomCharges) + Number(serviceCharges);
          const discountValue = total * 0.1;
          setTotalAmount(Number(total - discountValue));
        })
        .catch((error) => {
          console.error('Error calculating total bill:', error);
          // Handle error if needed
        });
      }else{
        setServiceCharges(0);
      CalculateTotalAmount()
        .then((totalRoomCharges) => {
         
         
          setTotalAmount(Number(0));
        })
        .catch((error) => {
          console.error('Error calculating total bill:', error);
          // Handle error if needed
        });
        
      }
    }
    
    useEffect(()=>{
      TotalBill()
    },[Amount])
    function pay(){
      if(Number(totalAmount) > 0){
        const formData = new FormData()
        formData.append("guest_id",guestId)
        formData.append("revenue_date",date)
        formData.append("room_revenue",totalRoomCharges)
        formData.append("service_revenue",serviceCharges)
        formData.append("discount",10)
        formData.append("total_revenue",totalAmount)
        axios.post('https://localhost:44343/hotel/addupdatereveneue',formData)
        .then((resp)=>{
          if(resp.data.success){
            alert('Payment Completed')
          }
        })
      }else{
        alert('No Due Amount')
      }
    }
    console.log('resrvation',reservation);
    console.log('totalroomcharges',totalRoomCharges);
    console.log('totalamount',totalAmount);
    console.log('servicesCharges',serviceCharges);
    
    
    
    

  return (
    <div className="main1">
        <div className="Booking main">
            <h1 className="Booking_heading head">Booking Rooms</h1>
            <label>
                <h3>Guest Id:</h3>
                <input type="number"  className="input" value={user?.guest_id} readOnly/>
            </label>
            <label>
              <h3>Billing Date:</h3>
              <input type="date"  name="BillingDate"  className="input" value={date} readOnly  />
            </label>
            <label htmlFor="roomType" ><h3>Services Charges:</h3>
            <input type="number" className="input" value={serviceCharges} readOnly/>
            </label>
            <label htmlFor="roomType" ><h3>Discount:</h3>
            <input type="number" className="input" value={10} />
            </label>
            <label htmlFor="roomType" ><h3>Total Amount to Pay:</h3>
            <input type="number" className="input" value={totalAmount} readOnly/>
            </label>
            <button className="btn" onClick={pay}>Pay</button>
        </div>
    </div>
  )
}

export default GuestBill