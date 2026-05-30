using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IPagesatService
    {
        Task<IEnumerable<Pagesat>> GetAllAsync();
        Task<Pagesat?> GetByIdAsync(int id);
        Task<Pagesat> CreateAsync(Pagesat pagesa);
        Task<bool> UpdateAsync(int id, Pagesat pagesa);
        Task<bool> DeleteAsync(int id);
    }
}