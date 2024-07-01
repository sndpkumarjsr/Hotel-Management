namespace Hotel_Management.Model
{
    public class AppSettings
    {
        public static ConnnectionString ConnnectionString { get; set; } = new ConnnectionString();
    }
    public class ConnnectionString
    {
        public string DevOps { get; set; }
        public string InetData { get; set; }
        public string TransregData { get; set; }
    }
}
