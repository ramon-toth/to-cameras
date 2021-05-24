import { speedApi } from '../services/speedService.js';
import { redlightApi } from '../services/redlightService.js';
import fs from 'fs';
import { dirname } from 'path';
import path from 'path';

import { fileURLToPath } from 'url';
import { Observable } from 'rxjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class DataController {
  updateSpeed() {
    speedApi.subscribe((s) => {
      s.forEach((e) => {
        e.geometry = JSON.parse(e.geometry).coordinates;
      });
      fs.writeFileSync(path.join(__dirname, '../data', 'speed.json'), JSON.stringify(s));
    });
  }
  updateRedlight() {
    redlightApi.subscribe((data) => {
      let d = data.map((d) => {
        return {
          id: d._id,
          name: d.NAME,
          district: d.DISTRICT,
          intersection_id: d.INTERSECTION_ID,
          street_1: d.LINEAR_NAME_FULL_1,
          street_2: d.LINEAR_NAME_FULL_2,
          geometry: JSON.parse(d.geometry).coordinates
        };
      });
      fs.writeFileSync(path.join(__dirname, '../data', 'redlight.json'), JSON.stringify(d));
    });
  }

  getSpeed() {
    return new Observable((subscriber) => {
      let rawdata = fs.readFileSync(path.join(__dirname, '../data', 'speed.json'));
      subscriber.next(JSON.parse(rawdata));
    });
  }
  getRedlight() {
    return new Observable((subscriber) => {
      let rawdata = fs.readFileSync(path.join(__dirname, '../data', 'redlight.json'));
      subscriber.next(JSON.parse(rawdata));
    });
  }

  testLog(data) {
    return new Promise((resolve, reject) => {
      try {
        fs.appendFileSync(path.join(__dirname, '../data', 'coords.json'), JSON.stringify(data));
        console.log(data);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
