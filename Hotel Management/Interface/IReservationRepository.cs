using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface IReservationRepository
    {
       
        List<Reservation> GetReservationByGuestId(int guest_id);

        void AddUpdateReservation(Reservation reservation);
        void AddAdminReservation(Guest guest,Reservation reservation);
    }
}
