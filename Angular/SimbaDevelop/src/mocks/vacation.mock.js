'use strict';
/**
 * @ngdoc object
 * @name mockData:vacation
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for vacation of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('VACATION_MOCK',
        {
            'balance_date': '12\/19\/1991',
            'vacation': '81',
            'vacation_buy': '9',
            'paid_time_off': '0',
            'convertible': '4',
            'flex': '47',
            'holiday': '34'
        }
    );
