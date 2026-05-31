using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface IWorkshopService
{
    Task<IEnumerable<Workshop>> GetAllAsync();
    Task<Workshop?> GetByIdAsync(int id);
    Task<Workshop> CreateAsync(Workshop workshop);
    Task UpdateAsync(Workshop workshop);
    Task DeleteAsync(int id);
}