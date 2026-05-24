using System.ComponentModel.DataAnnotations;

namespace MyApp.Domain;

public class Workshop
{
    [Key]
    public int workshop_id { get; set; }

    public String titulli {get; set; } = string.Empty;

    public String pershkrimi {get; set; } = string.Empty;

    public int instruktor_id{get; set; }

    public DateTime data {get; set; }

    public DateTime ora_fillimit {get; set; }

    public DateTime ora_perfundimit {get; set; }

    public double cmimi {get; set; }

    public int kapaciteti {get; set; } 

}