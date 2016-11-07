'use strict';
/**
 * @ngdoc object
 * @name mockData:jobs
 * @propertyOf insideApp.service:insideApiModel
 * @description
 * mockData for jobs of the insideApp
 */
angular.module('insideApp.mocks')
    .constant('JOBS_MOCK',
        [{
            'id': '1',
            'title': 'Test Job Title',
            'status': 'Open',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 10,
            'target': 10,
            'hired': 7
        }, {
            'id': '650033',
            'title': 'Software Systems Engineer (Senior or Principal Level)',
            'status': 'Open',
            'open_date': new Date('06\/03\/2015'),
            'oprid': 'cwcorey',
            'openings': 2,
            'target': 2,
            'hired': 0
        }, {
            'id': '2',
            'title': 'Tester',
            'status': 'Closed',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 8,
            'target': 8,
            'hired': 7
        }, {
            'id': '650034',
            'title': 'Software Systems Engineer (Senior or Principal Level)',
            'status': 'Open',
            'open_date': new Date('06\/03\/2015'),
            'oprid': 'cwcorey',
            'openings': 3,
            'target': 3,
            'hired': 1
        }, {
            'id': '3',
            'title': 'Quality Engineer',
            'status': 'Open',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 11,
            'target': 11,
            'hired': 7
        }, {
            'id': '650035',
            'title': 'Software Systems Engineer (Senior or Principal Level)',
            'status': 'Open',
            'open_date': new Date('06\/03\/2015'),
            'oprid': 'cwcorey',
            'openings': 1,
            'target': 1,
            'hired': 0
        }, {
            'id': '4',
            'title': 'Test Job Title',
            'status': 'Open',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 15,
            'target': 15,
            'hired': 3
        }, {
            'id': '650036',
            'title': 'Software Systems Engineer (Senior or Principal Level)',
            'status': 'Closed',
            'open_date': new Date('06\/03\/2015'),
            'oprid': 'cwcorey',
            'openings': 5,
            'target': 5,
            'hired': 5
        }, {
            'id': '5',
            'title': 'Testing',
            'status': 'Closed',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 7,
            'target': 7,
            'hired': 6
        }, {
            'id': '650037',
            'title': 'Software Systems Engineer (Beginner Level)',
            'status': 'Open',
            'open_date': new Date('05\/05\/2015'),
            'oprid': 'cwcorey',
            'openings': 12,
            'target': 5,
            'hired': 2
        }, {
            'id': '6',
            'title': 'Testing',
            'status': 'Open',
            'open_date': new Date('01\/25\/2016'),
            'oprid': 'cwcorey',
            'openings': 22,
            'target': 22,
            'hired': 2
        }, {
            'id': '650038',
            'title': 'Software Systems Engineer (Beginner Level)',
            'status': 'Closed',
            'open_date': new Date('05\/05\/2015'),
            'oprid': 'cwcorey',
            'openings': 9,
            'target': 9,
            'hired': 8
        }]
    );
