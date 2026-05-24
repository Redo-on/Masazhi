namespace MyApp.Domain;

public class Regjistrimet
{
    public int regjistrim_id { get; set; } // PK
    
    // Foreign Keys
    public int anetar_id { get; set; }
    public Anetaret Anetari { get; set; } = null!;
    
    public int orar_id { get; set; }
    public Orari Orari { get; set; } = null!;
    
    // Properties
    public DateTime data { get; set; }
    public string statusi { get; set; } = string.Empty;
    public string shenimet { get; set; } = string.Empty;
}
