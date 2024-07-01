import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { GuestType } from "../Login/Login";


const TopNav = () => {
    const [user, setUser] = useState<GuestType | null>(null)
    const [flag, setFlag] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if(location.state !== 'user' && location.state !== 'admin' && location.state != null){
            setUser(location.state)
            setFlag(true)
        }
        
    }, [location])

    function logout(){
        setFlag(false)
        setUser(null)
    }
    console.log('user', user);
    console.log('flag', flag);


    return (
        <>
          
                <div className="topnav">
                    <div>
                        {(flag)?<>
                            <Link className="topnav_links" to={'/home'}><h2>Hotel Management Application</h2></Link>

                        </>:<>
                        <Link className="topnav_links" to={'/'}><h2>Hotel Management Application</h2></Link>

                        </>}
                    </div>
                    <div className="topnav_link">
                        {(flag)?<>
                         <Link className="topnav_links" to={'/booking'} state={user}>Room Booking</Link>
                        <Link className="topnav_links" to={'/billing'} state={user}>Bills</Link>
                        <Link className="topnav_links" to={'/feedback'} state={user} >Feedback</Link>
                        <Link className="topnav_links" to={'/'} onClick={logout}>LogOut</Link>
                        </>:<>
                        </>}

                    </div>
                </div> 
               
        </>
    )
}

export default TopNav