
using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IRegjistrimetService
    {
        Task<IEnumerable<Regjistrimet>> GetAllAsync();
        Task<Regjistrimet?> GetByIdAsync(int id);
        Task<Regjistrimet> CreateAsync(Regjistrimet regjistrim);
        Task<bool> UpdateAsync(int id, Regjistrimet regjistrim);
        Task<bool> DeleteAsync(int id);
    }
}