'use strict';
/**
 * @ngdoc object
 * @name mockData:user
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for user of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('USER_MOCK',
        {
            'snl_id': '97771',
            'userid': 'cwcorey',
            'role': 'manager', //manager, oma, employee, nonEmployee
            'orgnum': '9531',
            first_name: 'Cara',
            last_name: 'Corey'
        }
    );
