namespace Hotel_Management.Model
{
    public class Reservation
    {
        public int reservation_id { get; set; }
        public int guest_id { get; set; }
        public string room_type { get; set; }
        public string check_in_date { get; set; }
        public string check_out_date { get; set; }
        public string reservation_status { get; set; }

    }
}
