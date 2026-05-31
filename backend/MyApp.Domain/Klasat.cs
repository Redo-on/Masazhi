using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;

public class Klasat
{
    [Key]
    public int klase_id { get; set; } 
    public string emri { get; set; } = string.Empty; 
    public string pershkrimi { get; set; } = string.Empty;
    public string lloji { get; set; } = string.Empty;
    public string niveli { get; set; } = string.Empty;
    public int kohezgjatja_min { get; set; }
    public int kapaciteti_max { get; set; }
    public int instruktor_id { get; set; }
}