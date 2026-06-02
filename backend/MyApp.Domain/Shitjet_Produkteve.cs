using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Domain;

public class Shitjet_Produkteve
{
    [Key]
    public int shitje_id { get; set; }

    // Fk
    public int anetar_id { get; set; }
    
    [ForeignKey("anetar_id")]
    public Anetaret? Anetari { get; set; } 

    public int produkti_id { get; set; }
    
    [ForeignKey("produkti_id")]
    public Produktet? Produkti { get; set; } 

    // Properties
    public int sasia { get; set; }
    public decimal cmimi_total { get; set; }
    public DateTime data { get; set; }
}