import https from 'https';
import { Observable } from 'rxjs';

import { Config } from '../config.js';
const packageId = Config.package_id_redlight;

// promise to retrieve the package
const getPackage = new Promise((resolve, reject) => {
  https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`, (response) => {
    let dataChunks = [];
    response
      .on('data', (chunk) => {
        dataChunks.push(chunk);
      })
      .on('end', () => {
        let data = Buffer.concat(dataChunks);
        resolve(JSON.parse(data.toString())['result']);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
});

// getPackage
//   .then((pkg) => {
//     // this is the metadata of the package
//     console.log(pkg);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// since this package has resources in the datastore, one can get the data rather than just the metadata of the resources
// promise to retrieve data of a datastore resource
const getDatastoreResource = (resource) =>
  new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource['id']}`, (response) => {
      let dataChunks = [];
      response
        .on('data', (chunk) => {
          dataChunks.push(chunk);
        })
        .on('end', () => {
          let data = Buffer.concat(dataChunks);
          resolve(JSON.parse(data.toString())['result']['records']);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });

// get the package information again

export const redlightApi = new Observable((subscriber) => {
  getPackage
    .then((p) => {
      // get the datastore resources for the package
      let datastoreResources = p['resources'].filter((r) => r.datastore_active);
      // retrieve the first datastore resource as an example
      getDatastoreResource(datastoreResources[0])
        .then((resource) => {
          // this is the actual data of the resource
          // console.log(resource);
          subscriber.next(resource);
        })
        .catch((error) => {
          subscriber.error(error);
          // console.error(error);
        });
    })
    .catch((error) => {
      subscriber.error(error);
    });
});
