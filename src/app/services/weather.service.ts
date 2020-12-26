import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'e69c61cba9a538a1b930f8e713397f8e';
  uri: string = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`;

  constructor( private _http: HttpClient ) { 
    
  }

  getWeather( cityName: string, countryCode: string): Observable<Response>{
    return  this._http.get<Response>(`${this.uri}${cityName},${countryCode}&units=metric`);
  }
}