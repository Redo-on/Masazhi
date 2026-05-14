namespace MyApp.Domain;

public class Orari
{
    public int orari_id { get; set; }
    public int klasa_id { get; set; } 
    public string dita_javes { get; set; } 
    public string ora_fillimit { get; set; } 
    public string ora_perfundimit { get; set; }
    public int salla_id { get; set; }
    public string statusi {get; set;}
}