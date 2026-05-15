namespace MyApp.Domain;

public class Instruktoret
{
    public int instruktor_id { get; set; }
    public string emri { get; set; }
    public string mbiemri { get; set; }
    public string specializimi { get; set; }
    public string certifikimet { get; set; }
    public string telefoni { get; set; }
    public string email { get; set; }
    public string biografia { get; set; }
    public DateTime data_fillimit { get; set; }
    public double tarifa_orare { get; set; }
}
