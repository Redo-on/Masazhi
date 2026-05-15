namespace MyApp.Domain;

public class Klasat
{
    public int klase_id { get; set; }
    public string emri { get; set; }
    public string pershkrimi { get; set; }
    public string lloji { get; set; }
    public string niveli { get; set; }
    public int kohezgjatja_min { get; set; }
    public int kapaciteti_max { get; set; }
    public int instruktor_id { get; set; }
}
