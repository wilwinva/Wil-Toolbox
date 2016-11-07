'use strict';
/**
 * @ngdoc object
 * @name mockData:classroomEnrollments
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for classroomEnrollments of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('CLASSROOM_ENROLLMENTS_MOCK',
        [{
            'student': 'Test User',
            'course': '001',
            'title': 'Physics',
            'due': new Date('08\/11\/2010'),
            'time': '0800',
            'status': 'Wait Listed',
            'due_in_2_weeks': false,
            'due_in_1_month': false,
            'location': '880/X53'
        }, {
            'student': 'Test User',
            'course': '002',
            'title': 'Calc-1',
            'due': new Date('04\/13\/1976'),
            'time': '0800',
            'status': 'Enrolled',
            'due_in_2_weeks': true,
            'due_in_1_month': true,
            'location': '880/X53'
        }, {
            'student': 'Test User',
            'course': '003',
            'title': 'Prop1',
            'due': new Date('04\/01\/2016'),
            'time': '0600',
            'status': 'In Progress',
            'due_in_2_weeks': true,
            'due_in_1_month': true,
            'location': '880/X53'
        },
            {
                'student': 'Test User',
                'course': '002',
                'title': 'Calc-1',
                'due': new Date('04\/13\/1976'),
                'time': '0800',
                'status': 'Enrolled',
                'due_in_2_weeks': true,
                'due_in_1_month': true,
                'location': '880/X53'
            },
            {
                'student': 'Test User',
                'course': '002',
                'title': 'Calc-1',
                'due': new Date('04\/13\/1976'),
                'time': '0800',
                'status': 'Enrolled',
                'due_in_2_weeks': true,
                'due_in_1_month': true,
                'location': '880/X53'
            },
            {
                'student': 'Test User',
                'course': '002',
                'title': 'Calc-1',
                'due': new Date('04\/13\/1976'),
                'time': '0800',
                'status': 'Enrolled',
                'due_in_2_weeks': true,
                'due_in_1_month': true,
                'location': '880/X53'
            }]
    );
