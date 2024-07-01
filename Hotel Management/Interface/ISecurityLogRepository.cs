using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface ISecurityLogRepository
    {
        List<SecurityLog> GetSecurityLogList();
    }
}
