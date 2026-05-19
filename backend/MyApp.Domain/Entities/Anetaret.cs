namespace MyApp.Domain;

public class Anetaret
{
    public int anetar_id { get; set; } 
    public string emri { get; set; } = string.Empty;
    public string mbiemri { get; set; } = string.Empty;
    public DateTime data_lindjes { get; set; }
    public string gjinia { get; set; } = string.Empty;
    public string telefoni { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string adresa { get; set; } = string.Empty;
    public DateTime data_regjistrimit { get; set; } = DateTime.UtcNow;
    public string lloji_anetaresimit { get; set; } = string.Empty;
    public string statusi { get; set; } = string.Empty;
}