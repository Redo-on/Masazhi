using MyApp.Domain;

namespace MyApp.Application.Interfaces
{
    public interface IAnetaresimetService
    {
        Task<IEnumerable<Anetaresimet>> GetAllAsync();
        Task<Anetaresimet?> GetByIdAsync(int id);
        Task<Anetaresimet> CreateAsync(Anetaresimet anetaresimi);
        Task<bool> UpdateAsync(int id, Anetaresimet anetaresimi);
        Task<bool> DeleteAsync(int id);
    }
}