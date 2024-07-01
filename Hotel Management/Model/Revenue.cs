namespace Hotel_Management.Model
{
    public class Revenue
    {
        public int revenue_id { get; set; }
        public int guest_id { get; set; }
        public string guest_name { get; set; }
        public string room_type { get; set; }
        public string check_in_date { get; set; }
        public string check_out_date { get; set; }
        public string revenue_date { get; set; }
        public int room_revenue { get; set; }
        public int service_revenue { get; set; }
        public double discount { get; set; }
        public double total_revenue { get; set; }
    }
}
