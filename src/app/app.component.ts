import { Component } from '@angular/core';
import NoSleep from 'nosleep.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  noSleep: any;
  title = 'traffic';

  isMobile = false;

  constructor() {
    this.noSleep = new NoSleep();
  }

  ngOnInit() {
    this.testDevice()
  }

  wakeLock(e: any) {
    e.checked ? this.noSleep.enable() : this.noSleep.disable()
    
  }

  testDevice() {
    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) { 
         this.isMobile = true
        }

    else if(/Chrome/i.test(ua)){ 
      this.isMobile = false
     }

    else { 
      this.isMobile = false
     }
  }
}
