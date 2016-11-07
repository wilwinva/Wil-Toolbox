'use strict';
/**
 * @ngdoc object
 * @name mockData:equipmentList
 * @propertyOf vactApp.vactApiModelMock
 * @description
 * mockData for equipment list of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('EQUIPMENT_LIST_MOCK',
        {
            'computers': [
                {
                    'type': 'laptop',
                    'label': 'Laptop',
                    'id': 'laptop'
                },
                {
                    'type': 'desktop',
                    'label': 'Desktop',
                    'id': 'desktop'
                },
                {
                    'type': 'tower',
                    'label': 'Tower',
                    'id': 'tower'
                }
            ],
            'cameras': [
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam',
                    'id': 'doccam'
                },
                {
                    'type': 'video_camera',
                    'label': 'Static Cam ',
                    'id': 'cam'
                },
                {
                    'type': 'adj_video_camera',
                    'label': 'Adj Cam ',
                    'id': 'vidcam'
                }
            ],
            'displays': [
                {
                    'type': 'monitor',
                    'label': 'Monitor',
                    'id': 'monitor'
                },
                {
                    'type': 'lcd',
                    'label': 'LCD',
                    'id': 'lcd'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma',
                    'id': 'plasma'
                },
                {
                    'type': 'projector',
                    'label': 'Projector',
                    'id': 'projector'
                }
            ],
            'peripherals': [
                {
                    'type': 'led',
                    'label': 'Led',
                    'id': 'led'
                },
                {
                    'type': 'microphone',
                    'label': 'Microphone',
                    'id': 'microphone'
                },
                {
                    'type': 'mouse',
                    'label': 'Mouse',
                    'id': 'mouse'
                },
                {
                    'type': 'speaker',
                    'label': 'Speaker',
                    'id': 'speaker'
                }
            ],
            'preloadedConfigurations':
            {
              'custom':{
                    'vactType':'custom',
                    'source':{},
                    'target':{}
                },
              'basic':
                {
                  'vactType':'basic',
                  'source': [
                    {
                      'type': 'video_camera',
                      'label': 'Cam 1',
                      'id': 'vidcam_1',
                      'target': 'lcd_1',
                      'inUse': 'lcd_1'
                    }
                  ],
                  'target': [
                    {
                      'type': 'lcd',
                      'label': 'LCD 1',
                      'id': 'lcd_1',
                      'source': 'vidcam_1',
                      'inUse': 'vidcam_1'
                    },
                    {
                      'type': 'lcd',
                      'label': 'LCD 2',
                      'id': 'lcd_2',
                      'source': 'none',
                      'inUse': 'none'
                    }
                  ]
                },
              'mini':
                {
                  'vactType':'chameleon-mini',
                  'source': [
                    {
                      'type': 'desktop',
                      'label': 'Desktop 1',
                      'id': 'desktop_1',
                      'target': 'lcd_2',
                      'inUse': 'lcd_2'
                    },
                    {
                      'type': 'video_camera',
                      'label': 'Cam 1',
                      'id': 'vidcam_1',
                      'target': 'lcd_1',
                      'inUse': 'lcd_1'
                    }
                    ],
                    'target': [
                     {
                      'type': 'lcd',
                      'label': 'LCD 1',
                      'id': 'lcd_1',
                      'source': 'vidcam_1',
                      'inUse': 'vidcam_1'
                    },
                    {
                      'type': 'lcd',
                      'label': 'LCD 2',
                      'id': 'lcd_2',
                      'source': 'desktop_1',
                      'inUse': 'desktop_1'
                    }
                  ]
                },
              'chameleon':
                {
                  'vactType': 'chameleon',
                  'source': [
                    {
                      'type': 'laptop',
                      'label': 'Laptop 1',
                      'id': 'laptop_1',
                      'target': 'lcd_2',
                      'inUse': 'lcd_2'
                    },
                    {
                      'type': 'laptop',
                      'label': 'Laptop 2',
                      'id': 'laptop_2',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'laptop',
                      'label': 'Laptop 3',
                      'id': 'laptop_3',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'laptop',
                      'label': 'Laptop 4',
                      'id': 'laptop_4',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'desktop',
                      'label': 'Desktop 1',
                      'id': 'desktop_1',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'document_camera',
                      'label': 'Doc Cam 1',
                      'id': 'doccam_1',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'document_camera',
                      'label': 'Doc Cam 2',
                      'id': 'doccam_2',
                      'target': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'video_camera',
                      'label': 'Cam 1',
                      'id': 'vidcam_1',
                      'target': 'lcd_1',
                      'inUse': 'lcd_1'
                    },
                    {
                      'type': 'video_camera',
                      'label': 'Cam 2',
                      'id': 'vidcam_2',
                      'target': 'none',
                      'inUse': 'none'
                    }
                    ],
                  'target': [
                    {
                      'type': 'lcd',
                      'label': 'LCD 1',
                      'id': 'lcd_1',
                      'source': 'vidcam_1',
                      'inUse': 'vidcam_1'
                    },
                    {
                      'type': 'lcd',
                      'label': 'LCD 2',
                      'id': 'lcd_2',
                      'source': 'laptop_1',
                      'inUse': 'laptop_1'
                    },
                    {
                      'type': 'plasma',
                      'label': 'Plasma 1',
                      'id': 'plasma_1',
                      'source': 'none',
                      'inUse': 'none'
                    },
                    {
                      'type': 'projector',
                      'label': 'Projector 1',
                      'id': 'projector_1',
                      'source': 'none',
                      'inUse': 'none'
                    }
                  ]
                }

            },
            'rooms':{
                '870/123':
                  {
                    'vactType': 'chameleon',
                    'classification': {'unclassified':true,'classified':true,'spn':false},
                    'source': [
                        {
                            'type': 'laptop',
                            'label': 'Laptop 1',
                            'id': 'laptop_1',
                            'target': 'lcd_2',
                            'inUse': 'lcd_2'
                        },
                        {
                            'type': 'laptop',
                            'label': 'Laptop 2',
                            'id': 'laptop_2',
                            'target': 'none',
                            'inUse': 'none'
                        },
                        {
                            'type': 'desktop',
                            'label': 'Desktop 1',
                            'id': 'desktop_1',
                            'target': 'none',
                            'inUse': 'none'
                        },
                        {
                            'type': 'document_camera',
                            'label': 'Doc Cam 1',
                            'id': 'doccam_1',
                            'target': 'none',
                            'inUse': 'none'
                        },
                        {
                            'type': 'video_camera',
                            'label': 'Cam 1',
                            'id': 'vidcam_1',
                            'target': 'lcd_1',
                            'inUse': 'lcd_1'
                        },
                        {
                            'type': 'video_camera',
                            'label': 'Cam 2',
                            'id': 'vidcam_2',
                            'target': 'none',
                            'inUse': 'none'
                        }
                    ],
                    'target': [
                        {
                            'type': 'lcd',
                            'label': 'LCD 1',
                            'id': 'lcd_1',
                            'source': 'vidcam_1',
                            'inUse': 'vidcam_1'
                        },
                        {
                            'type': 'lcd',
                            'label': 'LCD 2',
                            'id': 'lcd_2',
                            'source': 'laptop_1',
                            'inUse': 'laptop_1'
                        },
                        {
                            'type': 'plasma',
                            'label': 'Plasma 1',
                            'id': 'plasma_1',
                            'source': 'none',
                            'inUse': 'none'
                        }
                    ]
                }
            }
        }
    );
