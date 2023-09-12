namespace webapi.Models
{
    public class ShortUrlInfo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string ShortUrl { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedTime { get; set;}
    }
}