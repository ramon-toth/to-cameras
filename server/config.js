export const Config = {
  package_id_speed: 'a154790c-4a8a-4d09-ab6b-535ddb646770',
  package_id_redlight: '9fcff3e1-3737-43cf-b410-05acd615e27b'
};

export const datasets = [
  {
    city: 'Toronto',
    data: [
      {
        type: 'redlight',
        api: 'https://services6.arcgis.com/ONZht79c8QWuX759/arcgis/rest/services/Red_Light_Cameras/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
      },
      {
        type: 'speed',
        api: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/download_resource/e25e9460-a0e8-469c-b9fb-9a4837ac6c1c?format=geojson&projection=4326'
      }
    ]
  },
  {
    city: 'Peel',
    data: [
      {
        type: 'redlight',
        api: 'https://services6.arcgis.com/ONZht79c8QWuX759/arcgis/rest/services/Red_Light_Cameras/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
      }
    ]
  },
  {
    city: 'York',
    data: [
      {
        type: 'redlight',
        api: 'https://opendata.arcgis.com/datasets/a94a1fdce44f4bc391ec4dfb693e1a95_1.geojson'
      }
    ]
  }
];
