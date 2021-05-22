import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service'


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  currentLocation: Array<any> = []

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

    this.locationService.currentPosition().subscribe( (l: any) => {
      console.log(l.latitude);
      this.currentLocation.push(l)
    })
  }

}
