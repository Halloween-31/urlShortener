namespace webapi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }

        public static bool operator==(User first, User second)
        {
            if(first.Email == second.Email && first.Password == second.Password)
            {
                return true;
            }
            return false;
        }
        public static bool operator!=(User first, User second)
        {            
            if(first == second)
            {
                return false;
            }
            return true;
        }
    }

    public enum Role
    {
        Admin, 
        User
    }
}