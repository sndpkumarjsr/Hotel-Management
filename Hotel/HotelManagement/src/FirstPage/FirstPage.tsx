import { Link } from "react-router-dom"


const FirstPage = () => {
  return (
    <div className="main1" style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
        <div style={{textAlign:'center',width:'auto',height:'auto',display:'flex',flexWrap:'wrap',justifyContent:'space-around',gap:'25px',padding:'50px'}}>
            <div style={{border:'1px solid blue', width:'500px', height:'300px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/login'}state={'user'}><h3>Guest Login</h3></Link>
            </div>
            <div style={{border:'1px solid blue', width:'500px', height:'300px',textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex',cursor:'pointer'}}>
            <Link to={'/login'}state={'admin'}><h3>Admin Login</h3></Link>
            </div>
        </div>
    </div>
  )
}

export default FirstPage