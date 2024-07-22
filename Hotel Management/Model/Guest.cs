using System.ComponentModel.DataAnnotations;

namespace Hotel_Management.Model
{
    public class Guest
    {
        public int guest_id { get; set; }
        [Required]
        [MinLength(2,ErrorMessage ="Min 2 Chararcter")]
        [MaxLength(50,ErrorMessage ="Maximum 50 Character")]
        public string first_name { get; set; }
        public string last_name { get; set; }
        [Required]
        public string gender { get; set; }
        [Required]
        [EmailAddress(ErrorMessage ="Invalid Email Address")]
        public string email { get; set; }
        [Required]
        public long phone_number { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string password { get; set; }
    }
}
