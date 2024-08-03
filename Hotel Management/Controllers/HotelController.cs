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
        public IActionResult GetGuests(int? id = 0)
        {
            try
            {
                var result = repository.GetGuests((int)id);
                if (result == null) return BadRequest();
                return Ok(result);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("addupdateguest")]
        public IActionResult AddUpdate([FromForm] Guest guest)
        {
            try
            {
                if (guest != null)
                {
                    repository.AddGuest(guest);
                    return Ok(Json(new { success = true, Message = "Add or Update the Guest" }));
                }
                return BadRequest(Json(new { success = false, Message = "Invalid Guest" }));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("updatepassword")]
        public IActionResult UpdatePassword(string email, long mobile,  string password)
        {
            try
            {
                if (email != null && password != null)
                {
                    repository.UpdatePassword(email, mobile, password);
                    return Ok(Json(new { success = true, Message = "Password Changed" }));
                }
                return BadRequest(Json(new { success = false, Message = "Invalid data" }));
            }catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("getfeedback")]
        public IActionResult GetFeedbacks(int? id = 0)
        {
            try
            {
                var result = feedbackRepository.GetFeedbacks((int)id);
                if(result == null) return BadRequest();
                return Ok(result);
            }catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("addfeedback")]
        public IActionResult AddFeedback([FromForm] Feedback feedback)
        {
            try
            {
                if (feedback != null)
                {
                    feedbackRepository.AddFeedback(feedback);
                    return Ok(Json(new { success = true, Message = "Add Feedback" }));
                }
                return BadRequest(Json(new { success = false, Message = "Invalid Feedback" }));
            }catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        [HttpGet]
        [Route("getreservationbyguestid")]
        public IActionResult GetReservationbyGuestID(int id)
        {
            try
            {
                var result = reservationRepository.GetReservationByGuestId(id);
                if (result != null) return Ok(result);
                return BadRequest();
            }catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("addupdatereservation")]
        public IActionResult AddUpdateReservation([FromForm] Reservation reservation)
        {
            try
            {
                if (reservation != null)
                {
                    reservationRepository.AddUpdateReservation(reservation);
                    return Ok(Json(new { success = true, Message = "Add or Update Reservation" }));
                }
                return BadRequest(Json(new { success = false, Message = "Invalid Reservation" }));
            }catch(Exception e)
            {
                return StatusCode(500, e.Message);
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
                    reservationRepository.AddAdminReservation(guest, reservation);
                    return Ok(Json(new { success = true, Message = "Reservation added successfully." }));
                }
                return BadRequest(Json(new { success = false, Message = "Invalid reservation." }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, Message = "Internal Server Error." });
            }
        }

        [HttpGet]
        [Route("getrevenuebyguestid")]
        public IActionResult GetRevenueByGuestId(int? id=0)
        {
            try
            {
                var result = revenueRepository.GetRevenuesByGuestId((int)id);
                if (result == null) return BadRequest();
                return Ok(result);
            }catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("addupdatereveneue")]
        public IActionResult AddUpdateRevenue([FromForm] Revenue revenue)
        {
            try
            {
                if (revenue != null)
                {
                    revenueRepository.AddUpdateRevenue(revenue);
                    return Ok(Json(new { success = true, Message = "Add or Update Revenue" }));
                }
                    return BadRequest(Json(new { success = false, Message = "Invalid Revenue" }));
            }catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("getsecuritylog")]
        public IActionResult GetSecurityLog()
        {
            try
            {
                var result = securityLogRepository.GetSecurityLogList();
                if (result == null) return NotFound("");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("getroomdetails")]
        public IActionResult GetRoomRate([FromQuery]string room_type, [FromQuery]string check_in_date, [FromQuery]string check_out_date)
        {
            try
            {
                var roomRates = roomRateRepository.GetRooms(room_type, check_in_date, check_out_date);
                if (roomRates.Count == 0) return NotFound("Rooms Not Availables");
                return Ok(roomRates);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        [HttpGet]
        [Route("authuser")]
        public IActionResult AuthUsers([FromQuery]string Email, [FromQuery]string Password)
        {
            try
            {
                var guest = repository.AuthUser(Email, Password);
                if (guest == null) return NotFound("User not Found");
                return Ok(guest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        } 

    }
}
