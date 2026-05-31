using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;

public class Salla
{
    [Key]
    public int salla_id { get; set; }
    public string emri { get; set; } = string.Empty;
    public int kapaciteti { get; set; }
    public string pajisjet { get; set; } = string.Empty;
    public string pershkrimi { get; set; } = string.Empty;
}