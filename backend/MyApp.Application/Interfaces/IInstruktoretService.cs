using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IInstruktoretService
    {
        Task<IEnumerable<Instruktoret>> GetAllAsync();
        Task<Instruktoret?> GetByIdAsync(int id);
        Task<Instruktoret> CreateAsync(Instruktoret instruktor);
        Task<bool> UpdateAsync(int id, Instruktoret instruktor);
        Task<bool> DeleteAsync(int id);
    }
}