'use strict';
/**
 * @ngdoc object
 * @name mockData:vactRoomList
 * @propertyOf vactApp.vactApiModelMock
 * @description
 * mockData for vact room list of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('VACT_ROOM_LIST_MOCK',
        [
          {
            'label':'870/123',
            'bldg':'870',
            'room':'123',
            'type':'Chameleon'
          },
          {
            'label':'518/1026',
            'bldg':'518',
            'room':'1026',
            'type':'Legacy'
          },
          {
            'label':'700/1028',
            'bldg':'700',
            'room':'1028',
            'type':'Presentation'
          },
          {
            'label':'701/1001',
            'bldg':'701',
            'room':'1001',
            'type':'Legacy'
          },
          {
            'label':'701/2001',
            'bldg':'701',
            'room':'2001',
            'type':'Chameleon 1.0'
          },
          {
            'label':'702/1001',
            'bldg':'702',
            'room':'1001',
            'type':'Chameleon 2.0'
          },
          {
            'label':'702/1029',
            'bldg':'702',
            'room':'1029',
            'type':'Presentation'
          },
          {
            'label':'703/111',
            'bldg':'703',
            'room':'111',
            'type':'Presentation'
          },
          {
            'label':'704/218',
            'bldg':'704',
            'room':'218',
            'type':'Chameleon 2.0'
          }

        ]
  );
