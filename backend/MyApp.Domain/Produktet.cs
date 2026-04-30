namespace MyApp.Domain;

public class Produktet
{
    public int produkti_id { get; set; }
    public string emri { get; set; } = string.Empty;
    public string pershkrimi { get; set; } = string.Empty;
    public string kategoria { get; set; } = string.Empty;
    public double cmimi { get; set; }
    public int sasia_stock { get; set; }
}