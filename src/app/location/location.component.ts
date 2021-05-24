import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  currentLocation: Array<any> = [];

  constructor(private locationService: LocationService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.locationService.currentPosition().subscribe((l: any) => {
      console.log(l);
      this.currentLocation.push(l);
      this.apiService.testLog([l.latitude, l.longitude]).subscribe();
    });

    this.apiService.getSpeed().subscribe((speed) => console.log(speed));
  }
}
