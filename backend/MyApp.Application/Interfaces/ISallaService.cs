using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface ISallaService
{
    Task<IEnumerable<Salla>> GetAllAsync();

    Task<Salla?> GetByIdAsync(int id);

    Task<Salla> CreateAsync(Salla salla);

    Task<bool> UpdateAsync(int id, Salla salla);

    Task<bool> DeleteAsync(int id);
}