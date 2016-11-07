'use strict';
/**
 * @ngdoc object
 * @name mockData:trainingCompliance
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for trainingCompliance of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('TRAINING_COMPLIANCE_MOCK',
        [{
            'student': 'Test User',
            'course': '001',
            'title': 'Physics',
            'due': new Date('08\/11\/2010'),
            'status': 'Optional',
            'due_in_2_weeks': false,
            'due_in_1_month': false
        }, {
            'student': 'Test User',
            'course': '002',
            'title': 'Calc-1',
            'due': new Date('04\/13\/1976'),
            'status': 'Required',
            'due_in_2_weeks': true,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '003',
            'title': 'Calc-2',
            'due': new Date('04\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': false,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '004',
            'title': 'Calc-3',
            'due': new Date('04\/14\/2001'),
            'status': 'Optional',
            'due_in_2_weeks': false,
            'due_in_1_month': false
        }, {
            'student': 'Test User',
            'course': '005',
            'title': 'Calc-4',
            'due': new Date('03\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': true,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '006',
            'title': 'Calc-5',
            'due': new Date('04\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': false,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '007',
            'title': 'Calc-6',
            'due': new Date('03\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': false,
            'due_in_1_month': false
        }, {
            'student': 'Test User',
            'course': '008',
            'title': 'Calc-7',
            'due': new Date('04\/11\/2001'),
            'status': 'Required',
            'due_in_2_weeks': false,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '009',
            'title': 'Calc-8',
            'due': new Date('02\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': true,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '010',
            'title': 'Calc-9',
            'due': new Date('02\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': false,
            'due_in_1_month': true
        }, {
            'student': 'Test User',
            'course': '011',
            'title': 'Calc-9',
            'due': new Date('02\/13\/2001'),
            'status': 'Required',
            'due_in_2_weeks': true,
            'due_in_1_month': true
        }
        ]
    );
