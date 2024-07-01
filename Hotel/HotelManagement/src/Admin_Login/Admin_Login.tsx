import { Link } from "react-router-dom"


const Admin_Login = () => {
  return (
    <>
    <div style={{textAlign:'center',width:'auto',height:'auto',display:'flex',flexWrap:'wrap',justifyContent:'space-around',gap:'25px',padding:'50px'}}>
        
        <div style={{border:'1px solid blue', width:'400px', height:'200px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/guest_details'}><h3>Guest Details</h3></Link>
        </div>
        <div style={{border:'1px solid blue', width:'400px', height:'200px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/adminbooking'}><h3>Booking Rooms</h3></Link>
        </div>
        
        <div style={{border:'1px solid blue', width:'400px', height:'200px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/guest_feedback'}><h3>Guest Feedbacks</h3></Link>
        </div>
        <div style={{border:'1px solid blue', width:'400px', height:'200px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/bill_record'}><h3>Bills Records</h3></Link>
        </div>
        <div style={{border:'1px solid blue', width:'400px', height:'200px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/securitylog'}><h3>Security logs</h3></Link>
        </div>
        
        
    </div>
    </>
  )
}

export default Admin_Login
