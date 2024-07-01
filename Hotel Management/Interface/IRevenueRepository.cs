using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface IRevenueRepository
    {
    
        List<Revenue> GetRevenuesByGuestId(int guestId);
        void AddUpdateRevenue(Revenue revenue);
    }
}
