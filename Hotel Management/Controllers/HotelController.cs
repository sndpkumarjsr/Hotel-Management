using Hotel_Management.Interface;
using Hotel_Management.Model;
using Hotel_Management.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Management.Controllers
{
    [Route("hotel")]
    public class HotelController : Controller
    {
        private readonly IGuestRepository repository;
        private readonly IFeedbackRepository feedbackRepository;
        private readonly IReservationRepository reservationRepository;
        private readonly IRevenueRepository revenueRepository;
        private readonly ISecurityLogRepository securityLogRepository;
        private readonly IRoomRateRepository roomRateRepository;

        public HotelController(IGuestRepository repository, IFeedbackRepository feedbackRepository, IReservationRepository reservationRepository, IRevenueRepository revenueRepository,ISecurityLogRepository securityLogRepository,IRoomRateRepository roomRateRepository)
        {
            this.repository = repository;
            this.feedbackRepository = feedbackRepository;
            this.reservationRepository = reservationRepository;
            this.revenueRepository = revenueRepository;
            this.securityLogRepository = securityLogRepository;
            this.roomRateRepository = roomRateRepository;
        }

        [HttpGet]
        [Route("getguest")]
        public List<Guest> GetGuests(int? id = 0)
        {
            var result = repository.GetGuests((int)id);
            return result;
        }

        [HttpPost]
        [Route("addupdateguest")]
        public IActionResult AddUpdate([FromForm] Guest guest)
        {
            if (guest != null)
            {
                repository.AddGuest(guest);
                return Json(new { success = true, Message = "Add or Update the Guest" });
            }
            else
            {
                return Json(new { success = false, Message = "Invalid Guest" });
            }

        }

        [HttpPost]
        [Route("updatepassword")]
        public IActionResult UpdatePassword(string email, long mobile,  string password)
        {
            if (email != null && password != null )
            {
                repository.UpdatePassword(email, mobile, password);
                return Json(new { success = true,Message = "Password Changed"});
            }
            else
            {
                return Json(new { success = false, Message = "Invalid data" });
            }
        }

        [HttpGet]
        [Route("getfeedback")]
        public List<Feedback> GetFeedbacks(int? id = 0)
        {
            var result = feedbackRepository.GetFeedbacks((int)id);
            return result;
        }

        [HttpPost]
        [Route("addfeedback")]
        public IActionResult AddFeedback([FromForm] Feedback feedback)
        {
            if (feedback != null)
            {
                feedbackRepository.AddFeedback(feedback);
                return Json(new { success = true, Message = "Add Feedback" });
            }
            else
            {
                return Json(new { success = false, Message = "Invalid Feedback" });
            }

        }


        [HttpGet]
        [Route("getreservationbyguestid")]
        public List<Reservation> GetReservationbyGuestID(int id)
        {
            var result = reservationRepository.GetReservationByGuestId(id);
            return result;
        }

        [HttpPost]
        [Route("addupdatereservation")]
        public IActionResult AddUpdateReservation([FromForm] Reservation reservation)
        {
            if (reservation != null)
            {
                reservationRepository.AddUpdateReservation(reservation);
                return Json(new { success = true, Message = "Add or Update Reservation" });
            }
            else
            {
                return Json(new { success = false, Message = "Invalid Reservation" });
            }

        }

        [HttpPost]
        [Route("addadminreservation")]
        public IActionResult AddAdminReservation([FromForm] Guest guest, Reservation reservation)
        {
            try
            {
                if (reservation != null && guest != null)
                {
                    // Assuming reservationRepository is an instance of a repository class
                    reservationRepository.AddAdminReservation(guest, reservation);

                    // Return a JSON response indicating success
                    return Json(new { success = true, Message = "Reservation added successfully." });
                }
                else
                {
                    // Return a JSON response indicating failure due to invalid reservation
                    return Json(new { success = false, Message = "Invalid reservation." });
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("An error occurred while adding admin reservation: " + ex.Message);
                // Return a JSON response indicating an internal server error
                return StatusCode(500, new { success = false, Message = "Internal Server Error." });
            }
        }




        [HttpGet]
        [Route("getrevenuebyguestid")]
        public List<Revenue> GetRevenueByGuestId(int? id=0)
        {
            var result = revenueRepository.GetRevenuesByGuestId((int)id);
            return result;
        }

        [HttpPost]
        [Route("addupdatereveneue")]
        public IActionResult AddUpdateRevenue([FromForm] Revenue revenue)
        {
            if (revenue != null)
            {
                revenueRepository.AddUpdateRevenue(revenue);
                return Json(new { success = true, Message = "Add or Update Revenue" });
            }
            else
            {
                return Json(new { success = false, Message = "Invalid Revenue" });
            }

        }

        [HttpGet]
        [Route("getsecuritylog")]
        public List<SecurityLog> GetSecurityLog()
        {
            var result = securityLogRepository.GetSecurityLogList();
            return result;
        }

        [HttpGet]
        [Route("getroomdetails")]
        public List<RoomRate> GetRoomRate(string room_type, string check_in_date, string check_out_date)
        {
            return roomRateRepository.GetRooms(room_type,check_in_date,check_out_date);
        }
        [HttpPost]
        [Route("authuser")]
        public int AuthUsers(String Email, string Password)
        {
            return repository.AuthUser(Email, Password);
        } 

    }
}
