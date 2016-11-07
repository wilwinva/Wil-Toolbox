'use strict';
angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:insideMenu
     * @restrict E
     * @description used to build an footerusing templateUrl app/components/menu/menu.tpl.html and MenuCtrl
     */
    .directive('insideMenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/menu/menu.tpl.html',
            controller: 'MenuCtrl as ctrlMenu'
        }
    })

    /**
     * @ngdoc controller
     * @name insideApp.controller:MenuCtrl
     * @description Menu Controller of the insideApp
     */
    .controller('MenuCtrl', ['$state', '$window', '$scope', '$cookies', 'MENU', function ($state, $window, $scope, $cookies, MENU) {
        var self = this;
        var userRole = $cookies.get('userRole');
        self.isManager = (userRole  === 'manager');
        self.isEmployee = (userRole !== 'nonEmployee');

        //sets leftNav to menu constant
        self.menuData = MENU;

        /**
         * @ngdoc method
         * @name loadPage
         * @methodOf insideApp.controller:MenuCtrl
         * @description - load menu into page
         */
        self.loadPage = function (menuSelection) {
            // handle links separate from angular states
            if (menuSelection.href) {
                $window.location.href = menuSelection.href;
            }
            else {
                $state.go(menuSelection.state, {'page': menuSelection.page}, {'reload': false});
            }
        };


        /**
         * @ngdoc method
         * @name showMenuItem
         * @methodOf insideApp.controller:MenuCtrl
         * @description - decide if links are displayable based on user role
         */
        self.showMenuItem = function (menuItem) {
            var showEmployeeLink = (angular.isUndefined(menuItem.employeeOnly) || (menuItem.employeeOnly && self.isEmployee));
            var showManagerLink = (angular.isUndefined(menuItem.managerOnly) || (menuItem.managerOnly && self.isManager));
            var showManagerLink = (angular.isUndefined(menuItem.managerOnly) || (menuItem.managerOnly && self.isManager));
            var showNonEmployeeLink = angular.isDefined(menuItem.nonEmployeeOnly) && menuItem.nonEmployeeOnly && !self.isManager && !self.isEmployee;
            var showLink = (angular.isUndefined(menuItem.nonEmployeeOnly) && showEmployeeLink && showManagerLink) || showNonEmployeeLink;
            return showLink;
        }
    }])
    .constant('MENU', [
        {
            'menuHeader': 'Tools',
            'menuElements': [
                {
                    'title': 'Reserve a conference room',
                    'href': 'https://webprod.sandia.gov/CRS/Main',
                    'text': 'Conference Room Scheduler'
                },
                {
                    'title': 'View your computers, accounts, and IT alerts info',
                    'href': 'https://digs.sandia.gov',
                    'text': 'DiGS'
                },
                {
                    'title': 'File collaboration and sharing',
                    'href': 'https://eims.sandia.gov/Workplace/HomePage.jsp',
                    'text': 'EIMS FileNet'
                },
                {
                    'title': 'Get reimbursed for work travel',
                    'href': 'https://erplus.web.sandia.gov/',
                    'text': 'Expense Report Plus',
                    'employeeOnly': true
                },
                {
                    'title': 'Links to common forms and templates',
                    'state': 'inside.categoriesFromMenu',
                    'page': 'formsandtemplates',
                    'text': 'Forms & Templates'
                },
                {
                    'title': 'Your HR info',
                    'href': 'https://hrss.sandia.gov/psc/pspr1/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL',
                    'text': 'HR Self Service'
                },
                {
                    'title': 'Sandia\'s internal job posting',
                    'href': 'https://hrss.sandia.gov/psp/pspr1/EMPLOYEE/HRMS/c/HRS_HRAM_EMP.HRS_APP_SCHJOB.GBL?FOCUS=Employee&NAVSTACK=Clear&FolderPath=PORTAL_ROOT_OBJECT.HC_HRS_CE_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder',
                    'text': 'Jobs/Careers',
                    'employeeOnly': true
                },
                {
                    'title': 'Sandia\'s external job postings',
                    'href': 'https://cg.sandia.gov/psp/applicant/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?FOCUS=Applicant&FolderPath=PORTAL_ROOT_OBJECT.HC_HRS_CE_GBL2&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder',
                    'text': 'Jobs/Careers',
                    'nonEmployeeOnly': true
                },
                {
                    'title': 'Find a building or room at Sandia',
                    'href': 'https://map.sandia.gov/',
                    'text': 'Maps'
                },
                {
                    'title': 'View or edit your SharePoint\'s My Site profile',
                    'href': 'https://mysite.sandia.gov/person.aspx',
                    'text': 'My Site'
                },
                {
                    'title': 'Software Asset Mgmt System :: Buy/install software or manage license',
                    'href': 'https://sams.sandia.gov/',
                    'text': 'SAMS'
                },
                {
                    'title': 'Employee timesheet application',
                    'href': 'https://hrss.sandia.gov/psp/pspr1/EMPLOYEE/HRMS/c/ROLE_EMPLOYEE.TL_MSS_EE_SRCH_PRD.GBL',
                    'text': 'Timesheet',
                    'employeeOnly': true
                },
                {
                    'title': 'Timesheet Approval',
                    'href': 'https://hrss.sandia.gov/psp/pspr1/EMPLOYEE/HRMS/c/CAPTURE_TIME_AND_LABOR.TL_MSS_EE_SRCH_PRD.GBL?NAVSTACK=CLEAR',
                    'text': 'Timesheet Approval',
                    'managerOnly': true
                },
                {
                    'title': 'Links/resources for work travel',
                    'href': 'http://info.sandia.gov/travel/travelhp.htm',
                    'text': 'Travel',
                    'employeeOnly': true
                },
                {
                    'title': 'Web-based Computer Account Request System',
                    'href': 'https://webcars.sandia.gov/',
                    'text': 'WebCARS'
                },
                {
                    'title': 'Electronic shipping form',
                    'href': 'http://cfo.sandia.gov/logistics/Shipping/Page1WSF.htm',
                    'text': 'Web Shipper'
                },
                {
                    'title': 'Find a Sandia service provider',
                    'href': 'http://info.sandia.gov/yellowpages/',
                    'text': 'Yellow Pages : Sandia'
                }
            ]
        },
        {
            'menuHeader': 'Lab Info',
            'menuElements': [
                {
                    'title': 'Whom to call for help in an emergency',
                    'state': 'inside.alertsHelp',
                    'text': 'Alerts/Help Numbers'
                },
                {
                    'title': 'Corporate Computing Help Desk :: 845-2243',
                    'href': 'http://info.sandia.gov/cchd/',
                    'text': 'CCHD'
                },
                {
                    'title': 'Preferred engineering software, support services, training, and more',
                    'href': 'https://prod.sandia.gov/cee/',
                    'text': 'Common Engineering Environment'
                },
                {
                    'title': 'Definitions to Sandia-specific terms',
                    'href': 'https://info.sandia.gov/cps/corp_dict/index.html',
                    'text': 'Corporate Dictionary'
                },
                {
                    'title': 'Corporate process requirements and business rules',
                    'href': 'https://info.sandia.gov/cps/',
                    'text': 'Corporate Policy System'
                },
                {
                    'title': 'Environment, Safety & Health links',
                    'state': 'inside.categoriesFromMenu',
                    'page': 'es_h',
                    'text': 'ES&H'
                },
                {
                    'title': 'Government agency directories and websites',
                    'state': 'inside.categoriesFromMenu',
                    'page': 'governmentcontacts',
                    'text': 'Government Contacts'
                },
                {
                    'title': 'Leader Resource Center',
                    'href': 'https://info.sandia.gov/leader_resource_center/',
                    'text': 'Leader Resource Center'
                },
                {
                    'title': 'Find learning opportunities at Sandia',
                    'href': 'http://learn.sandia.gov/',
                    'text': 'Learning Portal'
                },
                {
                    'title': 'Sandia\'s shipping and mailing addresses',
                    'state': 'inside.sandiaAddresses',
                    'text': 'Sandia Addresses'
                },
                {
                    'title': 'Sandia\'s public-facing website (www.sandia.gov)',
                    'href': 'http://www.sandia.gov/',
                    'text': 'Sandia External Web'
                },
                {
                    'title': 'Sandia Management Information',
                    'href': 'https://inside.sandia.gov/smi/',
                    'text': 'Sandia Management Information'
                },
                {
                    'title': 'Security links on Techweb',
                    'state': 'inside.categoriesFromMenu',
                    'page': 'security',
                    'text': 'Security'
                },
                {
                    'title': 'Teasers',
                    'href': 'http://info.sandia.gov/hp/teasers/pastteasers.cgi',
                    'text': 'Teasers',
                    'mobileOnly': true
                },
                {
                    'title': 'Technical Library',
                    'href': 'https://sharepoint.sandia.gov/sites/Technical_Library/default.aspx',
                    'text': 'Technical Library'
                }
            ]
        }
    ]);
