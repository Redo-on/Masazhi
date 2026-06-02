using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface IShitjetProdukteveService
{
    Task<IEnumerable<Shitjet_Produkteve>> GetAllAsync();
    Task<Shitjet_Produkteve?> GetByIdAsync(int id);
    Task<IEnumerable<Shitjet_Produkteve>> GetByAnetarAsync(int anetarId);
    Task<IEnumerable<Shitjet_Produkteve>> GetByProduktetAsync(int produktiId);
    Task<Shitjet_Produkteve> CreateAsync(Shitjet_Produkteve shitje);
    
    // Change these two lines to match your Controller:
    Task<bool> UpdateAsync(int id, Shitjet_Produkteve shitje);
    Task<bool> DeleteAsync(int id);
}