
using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IAnetaretService
    {
        Task<IEnumerable<Anetaret>> GetAllAsync();
        Task<Anetaret?> GetByIdAsync(int id);
        Task<Anetaret> CreateAsync(Anetaret anetar);
        Task<bool> UpdateAsync(int id, Anetaret anetar);
        Task<bool> DeleteAsync(int id);
    }
}