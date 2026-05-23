namespace MyApp.Domain;

public class Shitjet_Produkteve
{
    public int shitje_id { get; set; }

    // Foreign Keys
    public int anetar_id { get; set; }
    public Anetaret Anetari { get; set; } = null!;

    public int produkti_id { get; set; }
    public Produktet Produkti { get; set; } = null!;

    // Properties
    public int sasia { get; set; }
    public decimal cmimi_total { get; set; }
    public DateTime data { get; set; }
}