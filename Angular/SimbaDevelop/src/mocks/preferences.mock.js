'use strict';
/**
 * @ngdoc object
 * @name mockData:preferences
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for preferences of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('PREFERENCES_MOCK',
        {
            'portletExpanded': {
                'aroundSandia': '0',
                'corpWorkbox': '0',
                'dirQuickSearch': '0',
                'property': '0',
                'vacation': '0',
                'links': '0',
                'rss': '1',
                'computers': '0',
                'trainingCompliance': '0',
                'trainingEnrollments': '0',
                'supportTeams': '0',
                'browseTechweb': '0'
            },
            'hasRss': true
        }
    );
