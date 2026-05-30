
using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IKlasatService
    {
        Task<IEnumerable<Klasat>> GetAllAsync();
        Task<Klasat?> GetByIdAsync(int id);
        Task<Klasat> CreateAsync(Klasat klasa);
        Task<bool> UpdateAsync(int id, Klasat klasa);
        Task<bool> DeleteAsync(int id);
    }
}