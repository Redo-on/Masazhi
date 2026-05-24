using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;

public class Anetaresimet
{
    [Key]
    public int anetaresimi_id { get; set; }
    public int anetar_id { get; set; } 
    public string lloji { get; set; } = string.Empty;
    public decimal cmimi { get; set; } // Financial precision
    public DateTime data_fillimit { get; set; }
    public DateTime data_mbarimit { get; set; }
    public string statusi { get; set; } = string.Empty;
}