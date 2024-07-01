namespace Hotel_Management.Model
{
    public class SecurityLog
    {
        public int log_id { get; set; }
        public int guest_id { get; set; }
        public string action_performed { get; set; }
        public string time_stamp { get; set; }
    }
}
