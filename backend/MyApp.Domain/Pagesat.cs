using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Domain;

public class Pagesat
{
    public int pagese_id { get; set; } // PK
    
    // Foreign Keys
    public int anetar_id { get; set; }
    
    [ForeignKey("anetar_id")]
    public Anetaret? Anetari { get; set;}
    public int anetaresim_id { get; set; }
    [ForeignKey("anetaresim_id")]
    public Anetaresimet? Anetaresimi { get; set; }
    
    // Properties
    public DateTime data_pageses { get; set; }
    public decimal shuma { get; set; }
    public string metoda { get; set; } = string.Empty;
    public string statusi { get; set; } = string.Empty;
}
