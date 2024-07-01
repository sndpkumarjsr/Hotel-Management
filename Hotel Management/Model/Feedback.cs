namespace Hotel_Management.Model
{
    public class Feedback
    {
        //public int feedback_id { get; set; }
        public int guest_id { get; set; }
        public string survey_date { get; set; }
        public int rating { get; set; }
        public string comment { get; set; }
        public string guest_name { get; set; }
    }
}
