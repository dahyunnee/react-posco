package com.diary.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherAPIDto {
    public List<Weather> weather;
    public static class Weather {

        public int id;
        public String main;
        public String description;
        public String icon;

        // getters and setters
    }

    public String returnWeather(){
        String finalWeather = "";
        for(Weather weather : this.weather){
            finalWeather += weather.description;
            if(this.weather.indexOf(weather) != this.weather.size() - 1)
                finalWeather += ", ";
        }
        return finalWeather;
    }
}
