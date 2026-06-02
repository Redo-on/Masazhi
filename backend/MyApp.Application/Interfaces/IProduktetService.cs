using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface IProduktetService
{
    Task<IEnumerable<Produktet>> GetAllAsync();
    Task<Produktet?> GetByIdAsync(int id);
    Task<Produktet?> GetByNameAndCategoryAsync(string emri, string kategoria);
    Task<Produktet> CreateAsync(Produktet produktet);
    Task UpdateAsync(Produktet produktet);
    Task DeleteAsync(int id);
}
