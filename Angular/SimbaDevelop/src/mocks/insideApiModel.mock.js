'use strict';
/**
 * @ngdoc service
 * @name insideApp.service:insideApiModel
 * @description
 * mockData for insideApiModel of the insideApp
 */
angular.module('insideApp.mocks', [])
    .service('insideApiModelMock', ['ALERTS_MOCK', 'CLASSROOM_ENROLLMENTS_MOCK', 'COMPUTERS_BY_ORG_MOCK', 'JOBS_MOCK',
        'LINKS_MOCK', 'PREFERENCES_MOCK', 'PROPERTY_MOCK', 'RSS_MOCK', 'RSS_FEED_MOCK', 'SUPPORT_TEAMS_MOCK',
        'TRAINING_BY_ORG_MOCK', 'TRAINING_COMPLIANCE_MOCK', 'USER_MOCK', 'VACATION_MOCK',
        function insideApiModelMock(ALERTS_MOCK, CLASSROOM_ENROLLMENTS_MOCK, COMPUTERS_BY_ORG_MOCK, JOBS_MOCK, LINKS_MOCK,
                              PREFERENCES_MOCK, PROPERTY_MOCK, RSS_MOCK, RSS_FEED_MOCK, SUPPORT_TEAMS_MOCK,
                              TRAINING_BY_ORG_MOCK, TRAINING_COMPLIANCE_MOCK, USER_MOCK, VACATION_MOCK) {
            var mockData =
            {
                alerts: ALERTS_MOCK,
                classroomEnrollments: CLASSROOM_ENROLLMENTS_MOCK,
                computersByOrg: COMPUTERS_BY_ORG_MOCK,
                jobs: JOBS_MOCK,
                links: LINKS_MOCK,
                preferences: PREFERENCES_MOCK,
                property: PROPERTY_MOCK,
                rss: RSS_MOCK,
                rssFeed: RSS_FEED_MOCK,
                supportTeams: SUPPORT_TEAMS_MOCK,
                trainingByOrg: TRAINING_BY_ORG_MOCK,
                trainingCompliance: TRAINING_COMPLIANCE_MOCK,
                user: USER_MOCK,
                vacation: VACATION_MOCK
            };
            return mockData;
        }])
;
