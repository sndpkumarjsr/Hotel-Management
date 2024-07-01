using Dapper;
using Hotel_Management.Interface;
using Hotel_Management.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Hotel_Management.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        IDbConnection connection = new SqlConnection(AppSettings.ConnnectionString.DevOps);

        public void AddFeedback(Feedback feedback)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("guest_id",feedback.guest_id);
            parameters.Add("survey_date",feedback.survey_date);
            parameters.Add("rating",feedback.rating);
            parameters.Add("comment",feedback.comment);

            connection.Execute("SPADDFEEDBACK",parameters, commandType : CommandType.StoredProcedure);
        }

        public List<Feedback> GetFeedbacks(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("id", id);
            var result = connection.Query<Feedback>("SPGETFEEDBACK", parameters, commandType : CommandType.StoredProcedure).ToList<Feedback>();
            return result;
        }
    }
}
