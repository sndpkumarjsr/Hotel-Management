using Hotel_Management.Model;

namespace Hotel_Management.Interface
{
    public interface IFeedbackRepository
    {
        List<Feedback> GetFeedbacks(int id);
        void AddFeedback(Feedback feedback);

    }
}
