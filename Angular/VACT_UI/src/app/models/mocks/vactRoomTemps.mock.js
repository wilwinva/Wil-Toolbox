'use strict';
/**
 * @ngdoc object
 * @name mockData:vactRoomTemps
 * @propertyOf vactApp.vactApiModelMock
 * @description
 * mockData for vact room temps of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('VACT_ROOM_TEMPS_MOCK',
        [
          {
            'room':'870/123',
            'temps': [
              {'label':'S4','data':98},
              {'label':'Tower 1','data':102},
              {'label':'Tower 2','data':103},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'518/1026',
            'temps': [
              {'label':'S4','data':97},
              {'label':'Laptop 1','data':110},
              {'label':'Tower 1','data':115},
              {'label':'Stack','data':101}
            ]
          },
          {
            'room':'700/1028',
            'temps': [
              {'label':'S4','data':88},
              {'label':'Stack','data':101}
            ]
          },
          {
            'room':'701/1001',
            'temps': [
              {'label':'S4','data':98},
              {'label':'Tower 1','data':102},
              {'label':'Tower 2','data':103},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'701/2001',
            'temps': [
              {'label':'S4','data':97},
              {'label':'Laptop 1','data':102},
              {'label':'Tower 1','data':103},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'702/1001',
            'temps': [
              {'label':'S4','data':98},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'702/1029',
            'temps': [
              {'label':'S4','data':98},
              {'label':'Tower 1','data':102},
              {'label':'Tower 2','data':103},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'703/111',
            'temps': [
              {'label':'S4','data':97},
              {'label':'Laptop 1','data':102},
              {'label':'Tower 1','data':103},
              {'label':'Stack','data':110}
            ]
          },
          {
            'room':'704/218',
            'temps': [
              {'label':'S4','data':98},
              {'label':'Stack','data':110}
            ]
          }



        ]
    );