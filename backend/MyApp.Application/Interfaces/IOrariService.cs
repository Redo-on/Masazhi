using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface IOrariService
{
    Task<IEnumerable<Orari>> GetAllAsync();

    Task<Orari?> GetByIdAsync(int id);

    Task<Orari> CreateAsync(Orari orari);

    Task<bool> UpdateAsync(int id, Orari orari);

    Task<bool> DeleteAsync(int id);
}