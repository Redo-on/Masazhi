namespace MyApp.Domain;

public class Klasat
{
    public int klasa_id { get; set; } 
    public string emri_klases { get; set; } = string.Empty;
    public string pershkrimi { get; set; } = string.Empty;
    public int instruktor_id { get; set; } 
    public int kapaciteti { get; set; }
    public string salla { get; set; } = string.Empty;
}