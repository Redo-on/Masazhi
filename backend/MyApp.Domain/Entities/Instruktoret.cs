using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;


public class Instruktoret
{
    [Key]
    public int instruktor_id { get; set; } // Primary Key
    public string emri { get; set; } = string.Empty;
    public string mbiemri { get; set; } = string.Empty;
    public string specializimi { get; set; } = string.Empty;
    public string certifikimet { get; set; } = string.Empty;
    public string telefoni { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string biografia { get; set; } = string.Empty;
    public DateTime data_fillimit { get; set; }
    public decimal tarifa_orare { get; set; } // Always use decimal for currency/rates
}