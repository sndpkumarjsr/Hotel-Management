using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hotel_Management.Repository
{
    public class SecurityLogRepository : ISecurityLogRepository
    {
        IDbConnection connection = new SqlConnection(AppSettings.ConnnectionString.DevOps);
        public List<SecurityLog> GetSecurityLogList()
        {
            var result = connection.Query<SecurityLog>("SPGETSECURITYLOG", commandType : CommandType.StoredProcedure).ToList<SecurityLog>();
            return result;
        }
    }
}
