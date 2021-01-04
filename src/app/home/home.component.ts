import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../services/weather.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faTimes = faTimes;
  faBars = faBars;
  public city: string; 
  public countryCode: string;
  public weather: any;
  public img: string;
  public location: string;
  public errors: any;
  public showToggle: string;
  public mode: string;
  public openSidenav: boolean;
  private screenWidth$ = new BehaviorSubject<number>
  (window.innerWidth);
  @ViewChild('sidenav')
  matSidenav!: MatSidenav;

  constructor( 
    private api: WeatherService, 
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver ) { 
    
    this.mode = '';
    this.showToggle = '';
    this.openSidenav = true;
    this.city = '';
    this.countryCode = '';
    this.img = 'assets/images/home.jpeg';
    this.location = '';
  }

  ngOnInit(): void {
    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.showToggle = 'show';
       this.mode = 'over';
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.showToggle = 'hide';
       this.mode = 'side';
       this.openSidenav = true;
     }
   });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  send(nav: MatSidenav){
    this.city.replace(/ /g,"+");
    if(this.city == '' && this.countryCode == ''){
      this._snackBar.open("Enter valid values", "Accept", {
        duration: 2000,
        panelClass: 'snackBar',
      }); 
    }
    else {
      const isSmallScreen = this.breakpointObserver.isMatched(
        "(max-width: 599px)"
      );
      if (isSmallScreen) {
        nav.toggle();
      }
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
        this.weather.weather[0].description === "mist" ||
        this.weather.weather[0].description === "light rain")){
          this.img = 'assets/images/stmorsend.jpeg'
          this.location = 'Storms End';
        }
        else if ((this.weather.main.temp >= 15 && this.weather.main.temp < 20) && 
        (this.weather.weather[0].description === "shower rain" ||
        this.weather.weather[0].description === "rain" ||
        this.weather.weather[0].description === "thunderstorm")){
          this.img = 'assets/images/pike.jpeg'
          this.location = 'Pyke';
        }
        else if ((this.weather.main.temp >= 15 && this.weather.main.temp < 20) && 
        (this.weather.weather[0].description === "mist" ||
        this.weather.weather[0].description === "light rain")){
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
        this.weather.weather[0].description === "thunderstorm" ||
        this.weather.weather[0].description === "light rain")){
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
          this.img = 'assets/images/ulthos.jpeg';
          this.weather = null;
      })
    }
    this.city = '';
    this.countryCode = '';
  }
}
