namespace MyApp.Domain;

public class Anetaresimet
{
    public int anetaresimi_id { get; set; }
    public int anetar_id { get; set; } 
    public Anetaret Anetari { get; set; } = null!;
    public string lloji { get; set; } = string.Empty;
    public decimal cmimi { get; set; } // Financial precision
    public DateTime data_fillimit { get; set; }
    public DateTime data_perfundimit { get; set; }
    public string statusi { get; set; } = string.Empty;
}