using MyApp.Domain;

namespace MyApp.Application.Interfaces;

public interface IRegjistrimiWorkshopService
{
    Task<IEnumerable<Regjistrimi_Workshop>> GetAllAsync();
    Task<Regjistrimi_Workshop?> GetByIdAsync(int id);
    
    // Additional queries based on the foreign keys in Regjistrimi_Workshop
    Task<IEnumerable<Regjistrimi_Workshop>> GetByAnetarAsync(int anetarId);
    Task<IEnumerable<Regjistrimi_Workshop>> GetByWorkshopAsync(int workshopId);
    
    Task<Regjistrimi_Workshop> CreateAsync(Regjistrimi_Workshop regjistrim);
    Task UpdateAsync(Regjistrimi_Workshop regjistrim);
    Task DeleteAsync(int id);
}