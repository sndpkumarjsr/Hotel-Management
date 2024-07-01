using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;

namespace Hotel_Management.Repository
{
    public class GuestRepository : IGuestRepository
    {
        IDbConnection connection = new SqlConnection(AppSettings.ConnnectionString.DevOps);

        public void AddGuest(Guest guest)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("guest_id", guest.guest_id);
            parameters.Add("first_name",guest.first_name);
            parameters.Add("last_name",guest.last_name);
            parameters.Add("gender",guest.gender);
            parameters.Add("email",guest.email);
            parameters.Add("phone_number", guest.phone_number);
            parameters.Add("address",guest.address);
            parameters.Add("password",guest.password);
            connection.Execute("SPADDGUEST", parameters,commandType: CommandType.StoredProcedure);
        }

        public List<Guest> GetGuests(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("id", id);
            var result = connection.Query<Guest>("SPGETGUEST", parameters,commandType : CommandType.StoredProcedure).ToList<Guest>();
            return result;
        }

        public void UpdatePassword(string email, long mobile, string password)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("email", email);
            parameters.Add("phone_number", mobile);
            parameters.Add("password", password);
            connection.Execute("SPUPDATEGUESTPASSWORD", parameters,commandType: CommandType.StoredProcedure);
        }
    }
}
