
import  { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(1);
  const [arrivalDate, setArrivalDate] = useState(getCurrentDate());
  const [departureDate, setDepartureDate] = useState('');
  const [roomType,setRoomType] = useState('')
  const [availability,setAvailabilty] = useState<any>()
  const [spots, setSpots] = useState([
    { name: 'Beach', distance: 5, duration: '15 minutes', img: 'https://media.istockphoto.com/id/1450094329/photo/colorful-sunset-viewed-from-the-pink-sea-beach-with-soft-waves.webp?b=1&s=170667a&w=0&k=20&c=UJX5fTa2onn_3ckgfc0U-BPevQTy0715EyjPvG7xqFU=' },
    { name: 'Mountain', distance: 10, duration: '30 minutes', img: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_640.jpg' },
    { name: 'Park', distance: 3, duration: '10 minutes', img: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iPmOf8OHqDp8/v1/-1x-1.jpg' },
    { name: 'Lake', distance: 8, duration: '25 minutes', img: 'https://cdn.britannica.com/03/121003-050-2544BD4E/Interior-Louvre-Museum-Paris.jpg' },
    { name: 'Museum', distance: 2, duration: '5 minutes', img: 'https://cdn.britannica.com/03/121003-050-2544BD4E/Interior-Louvre-Museum-Paris.jpg' }
  ]);
  const images = [
    "https://m.media-amazon.com/images/I/81cNCaDL9cL._AC_UF894,1000_QL80_.jpg",
    "https://www.visitcostarica.com/sites/default/files/directorio/hotels/foto4jungle.jpg",
    "https://q-xx.bstatic.com/xdata/images/hotel/max500/343742356.jpg?k=18b69a7e9feb8f4f8903855c26413c0d1e2b791c61bfd7f0030bb6ac70e622d9&o="
  ];
  const [feedback,setFeedback] = useState<any[]>([])

  useEffect(()=>{
    axios.get('https://localhost:44343/hotel/getfeedback?id=0')
    .then((resp)=>{
      setFeedback(resp.data)
    })
  },[])
 
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide % images.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function plusDivs(n) {
    setCurrentSlide(prevSlide => {
      let newSlide = prevSlide + n;
      if (newSlide > images.length) return 1;
      if (newSlide < 1) return images.length;
      return newSlide;
    });
  }

  function currentDiv(n) {
    setCurrentSlide(n);
  }

  const handleCheckAvailability = () => {
    if(!departureDate) alert('Please Select a Departure Date')
    if(!roomType) alert('Select Room Type')
    if( arrivalDate && departureDate && roomType){
    axios.get(`https://localhost:44343/hotel/getroomdetails?room_type=${roomType}&check_in_date=${arrivalDate}&check_out_date=${departureDate}`)
    .then((resp)=>{
      if(resp.status == 200){
        setAvailabilty(resp.data)
      }
    })
    if(availability)
    alert('Seat Available : ' + availability[0].total_num_room)
  }
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
 
  
  
  return (
    <>
    <div style={{ width: '100%' }}>
      <h2>Check Room Availability</h2>
      <div className="room-availability" style={{ backgroundColor: 'whitesmoke', paddingTop: '0px', height: 'fit-content' }}>
        <div className="availability-form" style={{ backgroundColor: 'grey', height: '90px', display: 'flex', fontSize: '22px', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginLeft: '-220px' }}>
            <label htmlFor="arrivalDate" style={{ color: 'black', fontWeight: 'bold', height: '40px', padding: '0px', display: 'inline-block' }}>Arrival Date:</label>
            <input type="date" id="arrivalDate" style={{ width: '180px', height: '30px', borderRadius: '30px 30px 30px 30px' }} name="arrivalDate" value={arrivalDate}  onChange={(e) => setArrivalDate(e.target.value)} min={getCurrentDate()} />
          </div>
          <div className='xx' style={{ marginLeft: '30px' }}>
            <label htmlFor="departureDate" style={{ color: 'black', fontWeight: 'bold', height: '35px', padding: '5px', display: 'inline-block' }}>Departure Date:</label>
            <input type="date" id="departureDate" name="departureDate" min={arrivalDate} style={{ width: '180px', height: '30px', borderRadius: '30px' }}value={departureDate} onChange={(e)=> setDepartureDate(e.target.value)} />
          </div>
          <div className='xx'>
            <label htmlFor="roomType" style={{ color: 'black', fontWeight: 'bold', height: '30px', padding: '5px', display: 'inline-block', borderRadius: '30px 0px 0px 30px' }}>Room Type:</label>
            <select id="roomType" name="roomType" onChange={(e)=>setRoomType(e.target.value)} style={{ width: '180px', height: '30px', borderRadius: '30px' }}>
              <option>Select</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Triple Room">Triple Room</option>
              <option value={"Quad Room"}>Quad Room</option>
            </select>
          </div>
          <div>
            <button className="check-availability-btn" style={{ position: 'absolute', borderRadius: '30px', fontSize: '18px', width: 'fit-content', marginLeft: '30px', marginTop: '-20px' }} onClick={handleCheckAvailability}>Check Availability</button>
          </div>
        </div>
      </div>
      <div className="w3-content w3-display-container" style={{ width: '100%', backgroundColor: 'whitesmoke' }}>
        {images.map((image, index) => (
          <img key={index} className="mySlides" src={image} style={{ display: index === currentSlide - 1 ? 'block' : 'none', width: '100%', height: '400px' }} />
        ))}
        <div className="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style={{ width: '100%' }}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`w3-badge demo w3-border w3-transparent w3-hover-white ${currentSlide === index + 1 ? 'w3-white' : ''}`}
              onClick={() => currentDiv(index + 1)}
            ></span>
          ))}
        </div>
      </div>
      <div style={{ color: 'white', display: 'flex', marginTop: '30px', overflowX: 'auto', border: '8px solid black', backgroundColor: '#333', maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {spots.map((item) => (
            <div style={{ margin: '10px', backgroundColor: 'black', padding: '5px' }} key={item.name}>
              <img src={item.img} width={250} height={200} alt="" />
              <p> Spot : {item.name}</p>
              <p>Distance : {item.distance} Km</p>
              <p>Duration : {item.duration}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ color: 'white', display: 'flex', marginTop: '30px', overflowX: 'auto', border: '8px solid black', backgroundColor: '#333', maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {feedback.map((item, index) => (
            <div style={{ margin: '10px', backgroundColor: 'black', padding: '5px', color: 'wheat', width: '300px' }} key={item.userName}>
              <p>{item.guest_name}</p>
              <p>{item.rating}</p>
              <Rating name={`rating-${index}`} value={item.rating} readOnly precision={0.1} />
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    
    </div>

   </>
  )
}

export default Home