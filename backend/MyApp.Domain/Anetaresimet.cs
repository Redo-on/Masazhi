namespace MyApp.Domain;

public class Anetaresimet
{
    public int anetaresim_id { get; set; }
    public int anetar_id { get; set; }
    public string lloji { get; set; }
    public DateTime data_fillimit { get; set; }
    public DateTime data_perfundimit { get; set; }
    public double cmimi { get; set; }
    public string statusi { get; set; }
}
