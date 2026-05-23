namespace MyApp.Domain;

public class Orari
{
    public int orar_id { get; set; } // Changed to match DB schema (orar_id not orari_id)
    public int klase_id { get; set; } 
    public string dita_javes { get; set; } = string.Empty;
    public string ora_fillimit { get; set; } = string.Empty;
    public string ora_perfundimit { get; set; } = string.Empty;
    public int salla_id { get; set; }
    public string statusi { get; set; } = string.Empty;
}