'use strict';
/**
 * @ngdoc object
 * @name mockData:rss
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for rss of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('RSS_MOCK',
        [
            {
                'id': '1',
                'snlid': '12345',
                'group_name': 'RSS Group 1',
                'feeds':[
                    {
                        'title': 'RSS Feed',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    },
                    {
                        'title': 'RSS Feed2',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    }
                ]
            },
            {
                'id': '2',
                'snlid': '12345',
                'group_name': 'RSS Group 2',
                'feeds':[
                    {
                        'title': 'RSS Feed3',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    },
                    {
                        'title': 'RSS Feed4',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    }
                ]
            },
            {
                'id': '3',
                'snlid': '12345',
                'group_name': 'RSS Group 3',
                'feeds':[
                    {
                        'title': 'RSS Feed5',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    },
                    {
                        'title': 'RSS Feed6',
                        'url': 'aHR0cDovL3d3dy5rb2F0LmNvbS85MTU0NzMyP2Zvcm1hdD1yc3NfMi4wJnZpZXc9ZmVlZA=='
                    }
                ]
            }
        ]
    );
