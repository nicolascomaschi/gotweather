import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public city: string; 
  public countryCode: string;
  public weather: any;
  public img: string;
  public location: string;
  public errors: any;
  constructor( private api: WeatherService, private _snackBar: MatSnackBar ) { 
    this.city = '';
    this.countryCode = '';
    this.img = 'assets/images/home.jpeg';
    this.location = '';
  }

  ngOnInit(): void {
  }

  send(){
    this.city.replace(/ /g,"+");
    if(this.city == '' && this.countryCode == ''){
      this._snackBar.open("Enter valid values", "Error", {
        duration: 2000,
      }); 
    }
    else {
      this.api.getWeather(this.city, this.countryCode).subscribe( 
        response => { 
        this.weather = response;
        if (this.weather.main.temp < -20 ) {
          this.img = 'assets/images/alwayswinter.jpeg'
          this.location = 'Lands of Always Winter';
        }
        else if (this.weather.main.temp >= -20 && this.weather.main.temp < -10){
          this.img = 'assets/images/the wall.jpeg'
          this.location = 'Beyond The Wall';
        }
        else if (this.weather.main.temp >= -10 && this.weather.main.temp < 10){
          this.img = 'assets/images/winterfell1.jpeg'
          this.location = 'Winterfell';
        }
        else if ((this.weather.main.temp >= 10 && this.weather.main.temp < 15) && 
        (this.weather.weather[0].description === "clear sky" || 
        this.weather.weather[0].description === "few clouds" ||
        this.weather.weather[0].description === "scattered clouds" ||
        this.weather.weather[0].description === "broken clouds")){
          this.img = 'assets/images/theeyrie.jpeg'
          this.location = 'The Eyrie';
        }
        else if ((this.weather.main.temp >= 10 && this.weather.main.temp < 15) && 
        (this.weather.weather[0].description === "shower rain" || 
        this.weather.weather[0].description === "rain" ||
        this.weather.weather[0].description === "thunderstorm" ||
        this.weather.weather[0].description === "mist")){
          this.img = 'assets/images/stmorsend.jpeg'
          this.location = 'Storms End';
        }
        else if ((this.weather.main.temp >= 15 && this.weather.main.temp < 20) && 
        (this.weather.weather[0].description === "rain" ||
        this.weather.weather[0].description === "thunderstorm")){
          this.img = 'assets/images/pike.jpeg'
          this.location = 'Pyke';
        }
        else if ((this.weather.main.temp >= 15 && this.weather.main.temp < 20) && 
        (this.weather.weather[0].description === "shower rain" ||
        this.weather.weather[0].description === "mist")){
          this.img = 'assets/images/braavos.jpeg'
          this.location = 'Braavos';
        }
        else if ((this.weather.main.temp >= 15 && this.weather.main.temp < 20) && 
        (this.weather.weather[0].description === "clear sky" || 
        this.weather.weather[0].description === "few clouds" ||
        this.weather.weather[0].description === "scattered clouds" ||
        this.weather.weather[0].description === "broken clouds")){
          this.img = 'assets/images/astapor.jpeg'
          this.location = 'Astapor';
        }
        else if ((this.weather.main.temp >= 20 && this.weather.main.temp < 25) && 
        (this.weather.weather[0].description === "clear sky" || 
        this.weather.weather[0].description === "few clouds" ||
        this.weather.weather[0].description === "scattered clouds" ||
        this.weather.weather[0].description === "broken clouds")){
          this.img = 'assets/images/oldtown.jpeg'
          this.location = 'Oldtown';
        }
        else if ((this.weather.main.temp >= 20 && this.weather.main.temp < 25) && 
        (this.weather.weather[0].description === "shower rain" ||
        this.weather.weather[0].description === "mist" ||
        this.weather.weather[0].description === "rain" ||
        this.weather.weather[0].description === "thunderstorm")){
          this.img = 'assets/images/kingslanding.jpeg'
          this.location = 'Kings Landing';
        }
        else if (this.weather.main.temp >= 25 && this.weather.main.temp < 30){
          this.img = 'assets/images/VaesDothrak.jpg'
          this.location = 'The Dothraki Sea';
        }
        else if (this.weather.main.temp > 30 ) {
          this.img = 'assets/images/dorne.jpeg'
          this.location = 'Dorne';
        }
        },
        error => {
          this.errors = error;
          this._snackBar.open('Sorry but I don\'t know that city, it\'s probably like Ulthos', 'Error', {
            duration: 5000,
          }); 
        })
    }
    console.log(this.weather);
    this.city = '';
    this.countryCode = '';
  }
}
