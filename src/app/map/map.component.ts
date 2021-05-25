import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocationService} from '../services/location.service'

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  currentLocation: any;
  loading = false;

  constructor(private apiService: ApiService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.loading = true;
    this.getLocation()
    this.initMap();

  }

  getLocation() {
    this.locationService.currentPosition().subscribe((l: any) => {
      this.currentLocation = [l.longitude, l.latitude];
      this.apiService.testLog([l.latitude, l.longitude]).subscribe();
      this.setCenter([l.longitude, l.latitude])
    });

  }

  initMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      // view: new ol.View({
      //   center: ol.proj.fromLonLat(this.currentLocation),
      //   zoom: 16
      // })
    });
    // this.icon();
    // test
    this.apiService.getSpeed().subscribe((speed) => this.cameraMarkers(speed));
    this.apiService.getRedlight().subscribe((rl) => this.cameraMarkers(rl));
  }

  locationMarker() {
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(this.currentLocation))
          })
        ]
      })
    });
    this.map.addLayer(layer);
  }

  setCenter(center: Array<any>) {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat(center));
    view.setZoom(16);
    this.locationMarker();
    this.loading = false;
  }

  cameraMarkers(coordinates: any) {
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: coordinates.map((c: any) => {
          return new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(c.geometry))
          });
        })
      })
    });
    this.map.addLayer(layer);
  }

  icon() {
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(this.currentLocation),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://c0.klipartz.com/pngpicture/409/413/gratis-png-pin-de-dibujo-de-mapa-marcador-de-mapa-thumbnail.png'
      })
    });

    iconFeature.setStyle(iconStyle);

    console.log(ol.source);
    var vectorSource = new ol.source.Vector({
      features: [iconFeature]
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }
}
