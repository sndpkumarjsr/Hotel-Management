using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface IGuestRepository
    {
         List<Guest> GetGuests(int id);
         void AddGuest(Guest guest);
        void UpdatePassword(string email, long mobile, string password);
        int AuthUser(string email, string password);
    }
}
