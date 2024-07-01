import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const BillRecords = () => {
    const [bills,setBills] = useState<any[]>([])
    const [allBills,setAllBills]= useState<any[]>([])
    const [date,setDate] = useState('')
    

    useEffect(()=>{
        axios.get('https://localhost:44343/hotel/getrevenuebyguestid?id=0')
        .then((resp)=>{
            setBills(resp.data)
        })
       
    },[])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
      };
    
    
    function handleSubmit(){
        const reversedDate = formatDate(date);
        const filteredBills = bills.filter(item => {
            const formattedDate = formatDate(item.check_in_date);
            return formattedDate === reversedDate;
          });
          if(filteredBills){
            setAllBills(filteredBills)
          }else{
            alert('No Records')
          }        
    }

    function handleAllRecord(){
        setAllBills(bills)
    }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'50px'}}>
         <Link className="topnav_links" style={{color:'red'}} to={'/admin'}><h2>Home</h2></Link>
        <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
            <h3>Check In Date :</h3>
            <input type="date" style={{padding:'10px'}} onChange={(e)=>setDate(e.target.value)} />
            <button style={{padding:'10px'}} onClick={handleSubmit}>Submit</button>
        </div>
        <div style={{ display:'flex', gap:'20px',alignItems:'center',justifyContent:'center', padding:'10px'}}>
                <button style={{padding:'10px'}} onClick={handleAllRecord}>All Records</button>
        </div>
        <div style={{border:'1px solid blue',marginTop:'50px'}}>
            <table >
                
                <thead>
                    <tr>
                    <th>Recipt Id</th>
                    <th>Guest Id</th>
                    <th>Guest Name</th>
                    <th>Room type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Bill Date</th>
                    <th>Room Charges</th>
                    <th>Service Charges</th>
                    <th>Discount</th>
                    <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {allBills.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.revenue_id}</td>
                            <td>{item.guest_id}</td>
                            <td>{item.guest_name}</td>
                            <td>{item.room_type}</td>
                            <td>{item.check_in_date}</td>
                            <td>{item.check_out_date}</td>
                            <td>{item.revenue_date}</td>
                            <td>{item.room_revenue}</td>
                            <td>{item.service_revenue}</td>
                            <td>{item.discount}</td>
                            <td>{item.total_revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default BillRecords
