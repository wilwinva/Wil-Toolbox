'use strict';
/**
 * @ngdoc object
 * @name mockData:roomConfiguration
 * @propertyOf vactApp.vactApiModelMock
 * @description
 * mockData for room configuration of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('ROOM_CONFIG_MOCK',
        {
            'bldg': '870',
            'room': '123',
            'vactType': 'chameleon',
            'source': [
                {
                    'type': 'laptop',
                    'label': 'Laptop 1',
                    'id': 'laptop1',
                    'target': 'lcd2',
                    'inUse': 'lcd2',
                    'secured': false
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 2',
                    'id': 'laptop2',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': false
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 3',
                    'id': 'laptop3',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': false
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 4',
                    'id': 'laptop4',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': false
                },
                {
                    'type': 'desktop',
                    'label': 'Desktop 1',
                    'id': 'desktop1',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': true
                },
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam 1',
                    'id': 'doccam1',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': true
                },
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam 2',
                    'id': 'doccam2',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': false
                },
                {
                    'type': 'video_camera',
                    'label': 'Cam 1',
                    'id': 'vidcam1',
                    'target': 'lcd1',
                    'inUse': 'lcd1',
                    'secured': true
                },
                {
                    'type': 'video_camera',
                    'label': 'Cam 2',
                    'id': 'vidcam2',
                    'target': 'none',
                    'inUse': 'none',
                    'secured': false
                }

            ],
            'target': [
                {
                    'type': 'lcd',
                    'label': 'LCD 1',
                    'id': 'lcd1',
                    'source': 'vidcam1',
                    'inUse': 'vidcam1'
                },
                {
                    'type': 'lcd',
                    'label': 'LCD 2',
                    'id': 'lcd2',
                    'source': 'laptop1',
                    'inUse': 'laptop1'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma 1',
                    'id': 'plasma1',
                    'source': 'none',
                    'inUse': 'none'
                },
                {
                    'type': 'projector',
                    'label': 'Projector 1',
                    'id': 'projector1',
                    'source': 'none',
                    'inUse': 'none'
                }
            ]
        }
    );
