namespace MyApp.Domain;

public class Workshop
{
    public int workshop_id { get; set; }

    public string titulli { get; set; } = string.Empty;

    public string pershkrimi { get; set; } = string.Empty;

    public int instruktor_id { get; set; }

    public DateTime data { get; set; }

    public DateTime ora_fillimit { get; set; }

    public DateTime ora_perfundimit { get; set; }

    public decimal cmimi { get; set; }

    public int kapaciteti { get; set; }
}