'use strict';
/**
 * @ngdoc object
 * @name mockData:alerts
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for alerts of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('ALERTS_MOCK',
        {
            'Alert': 'Sandia-wide Alert. Testing seven eight nine ten eleven.',
            'NM Alert': 'NM-only Alert. Testing one two three.'
        }
    );
