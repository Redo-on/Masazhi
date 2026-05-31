namespace MyApp.Domain;

public class Pagesat
{
    public int pagese_id { get; set; } // PK
    
    // Foreign Keys
    public int anetar_id { get; set; }
    public Anetaret Anetari { get; set; } = null!;
    
    public int anetaresim_id { get; set; }
    public Anetaresimet Anetaresimi { get; set; } = null!;
    
    // Properties
    public DateTime data_pageses { get; set; }
    public decimal shuma { get; set; }
    public string metoda { get; set; } = string.Empty;
    public string statusi { get; set; } = string.Empty;
}
