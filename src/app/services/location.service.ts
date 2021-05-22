import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  constructor() { }

  currentPosition() {
    return new Observable(subscriber => {
      navigator.geolocation.watchPosition(
        pos => subscriber.next(pos.coords),
        err => subscriber.error(err),
        this.options
    );
  
    })
  
  }
}
