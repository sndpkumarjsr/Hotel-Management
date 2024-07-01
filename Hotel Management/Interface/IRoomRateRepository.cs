using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface IRoomRateRepository
    {
       
        List<RoomRate> GetRooms(string room_type,string check_in_date,string check_out_date);
    }
}
