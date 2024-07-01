using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hotel_Management.Repository
{
    public class RoomRateRepository : IRoomRateRepository
    {
        IDbConnection connection = new SqlConnection(AppSettings.ConnnectionString.DevOps);
        

        public List<RoomRate> GetRooms(string room_type, string check_in_date, string check_out_date)
        {
            DynamicParameters parameter = new DynamicParameters();
            parameter.Add("room_type", room_type);
            parameter.Add("check_in_date", check_in_date);
            parameter.Add("check_out_date", check_out_date);
            return connection.Query<RoomRate>("SPGETROOMRATE",parameter, commandType : CommandType.StoredProcedure).ToList<RoomRate>();
        }

        
    }
}
