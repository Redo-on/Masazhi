using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;

public class Orari
{
    [Key]
    public int orari_id { get; set; }
    public int klasa_id { get; set; } 
    public string dita_javes { get; set; } = string.Empty;
    public string ora_fillimit { get; set; } = string.Empty;
    public string ora_perfundimit { get; set; }= string.Empty;
    public int salla_id { get; set; }
    public string statusi {get; set;} = string.Empty;
}