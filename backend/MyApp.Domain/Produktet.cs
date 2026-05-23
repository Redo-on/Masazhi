namespace MyApp.Domain;

public class Produktet
{
    public int produkti_id { get; set; }
    public string emri { get; set; } = string.Empty;
    public string pershkrimi { get; set; } = string.Empty;
    public string kategoria { get; set; } = string.Empty;
    public decimal cmimi { get; set; }
    public int sasia_stok { get; set; }

    // Navigation property
    public ICollection<Shitjet_Produkteve> Shitjet { get; set; } = new List<Shitjet_Produkteve>();
}