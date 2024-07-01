using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hotel_Management.Repository
{
    public class RevenueRepository : IRevenueRepository
    {
        IDbConnection connection = new SqlConnection(AppSettings.ConnnectionString.DevOps);

        public void AddUpdateRevenue(Revenue revenue)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("revenue_id", revenue.revenue_id);
            parameters.Add("guest_id", revenue.guest_id);
            parameters.Add("revenue_date", revenue.revenue_date);
            parameters.Add("room_revenue",revenue.room_revenue);
            parameters.Add("service_revenue", revenue.service_revenue);
            parameters.Add("discount", revenue.discount);
            parameters.Add("total_revenue", revenue.total_revenue);

            connection.Execute("SPADDREVENUE", parameters,commandType : CommandType.StoredProcedure);
        }

        public List<Revenue> GetRevenuesByGuestId(int guestId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("guest_id", guestId);
            var result = connection.Query<Revenue>("SPGETREVENUEANALYSISBYGUESTID", parameters, commandType: CommandType.StoredProcedure).ToList<Revenue>();
            return result;
        }

       
    }
}
