
// import './App.css'

import { Outlet, createBrowserRouter } from "react-router-dom"
import Login from "./Login/Login"
import ForgetPassword from "./ForgetPassword/ForgetPassword"
import SignUp  from "./SignUp/SignUp"
import Home from "./Home/Home"
import Feedback from "./Feedback/Feedback"
import TopNav from "./TopNav/TopNav"
import Booking from "./Booking/Booking"
import Admin_Login from "./Admin_Login/Admin_Login"
import SecurityLog from "./SeccurityLog/SecurityLog"
import GuestDetails from "./Guestdetails/GuestDetails"
import GuestFeedback from "./GuestFeedback/GuestFeedback"
import BillRecords from "./BillRecords/BillRecords"
import AdminBooking from "./AdminBooking/AdminBooking"
import GuestBill from "./Bill/GuestBill"
import FirstPage from "./FirstPage/FirstPage"
export const AppBrowser = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/',
        element:<FirstPage />
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path: "forget-pass",
        element: <ForgetPassword />,
      },
      {
        path:'sign-up',
        element:<SignUp/>
      },
      {
        path:'home',
        element:<Home />
      },
      {
        path:'feedback',
        element:<Feedback />
      },
      {
        path:'booking',
        element:<Booking />
      },
      {
        path:'admin',
        element:<Admin_Login />
      },
      {
        path:'securitylog',
        element:<SecurityLog />
      },
      {
        path:'guest_details',
        element:<GuestDetails />
      },
      {
        path:'guest_feedback',
        element:<GuestFeedback />
      },
      {
        path:'bill_record',
        element:<BillRecords />
      },
      {
        path:'adminbooking',
        element:<AdminBooking />
      },
      {
        path:'billing',
        element:<GuestBill />
      }
    ],
  }
])

function App() {
 

  return (
    <>
    <TopNav />
    <Outlet/>
    </>
  )
}

export default App
