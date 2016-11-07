'use strict';

angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:PreferencesCtrl
     * @description Preferences Controller of the insideApp
     */
    .controller('PreferencesCtrl', ['$cookies', 'preferences',
        function ($cookies, preferenceData) {
            var self = this;
            self.portletExpanded = preferenceData.portletExpanded;
            self.hasRss = preferenceData.hasRss;

            self.userid = $cookies.get('userid');
            self.orgnum = $cookies.get('orgnum');

            var userRole = $cookies.get('userRole');
            self.isManager = (userRole === 'manager');
            self.isEmployee = (userRole === 'employee');

            if (userRole === 'manager')
                self.portal = 'manager';
            else if (userRole === 'oma')
                self.portal = 'manager'; //oma's are mgr delegates need to see training compliance
            else if (userRole === 'entity')
                self.portal = 'entity';
            else
                self.portal = 'mow';
        }
    ]);
