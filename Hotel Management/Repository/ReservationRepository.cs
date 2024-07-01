using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hotel_Management.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        IDbConnection db = new SqlConnection(AppSettings.ConnnectionString.DevOps);
       

        public List<Reservation> GetReservationByGuestId(int guest_id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("guest_id", guest_id);
            var result = db.Query<Reservation>("SPGETRESERVATIONBYGUESTID", parameters, commandType: CommandType.StoredProcedure).ToList<Reservation>();
            return result;
        }

        public void AddUpdateReservation(Reservation reservation)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("reservation_id",reservation.reservation_id);
            parameters.Add("guest_id", reservation.guest_id);
            parameters.Add("room_type", reservation.room_type);
            parameters.Add("check_in_date",reservation.check_in_date);
            parameters.Add("check_out_date", reservation.check_out_date);
            parameters.Add("reservation_status", reservation.reservation_status);

            db.Execute("SPADDRESERVATION", parameters, commandType : CommandType.StoredProcedure);

        }

        public void AddAdminReservation(Guest guest, Reservation reservation)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@first_name", guest.first_name);
            parameters.Add("@last_name", guest.last_name);
            parameters.Add("@gender", guest.gender);
            parameters.Add("@email", guest.email);
            parameters.Add("@phone_number", guest.phone_number);
            parameters.Add("@address", guest.address);
            parameters.Add("@password", guest.password); // Make sure your database schema supports storing passwords safely
            parameters.Add("@room_type", reservation.room_type);
            parameters.Add("@check_in_date", reservation.check_in_date);
            parameters.Add("@check_out_date", reservation.check_out_date);
            parameters.Add("@reservation_status", reservation.reservation_status);

            // Assuming db is an instance of a database connection or context
            db.Execute("ADDADMINRESERVATION", parameters, commandType: CommandType.StoredProcedure);
        }

    }
}
