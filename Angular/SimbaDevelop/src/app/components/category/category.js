'use strict';

angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:CategoryCtrl
     * @description Category Controller of the insideApp
     */
    .controller('CategoryCtrl', ['$window', '$timeout', '$anchorScroll', '$scope', 'menuData', 'curlData', 'page', 'section',
        function ($window, $timeout, $anchorScroll, $scope, menuData, data, page, section) {
            var self = this;
            self.data = data;
            self.section = section;
            self.categoryTitle = '';

            if (menuData) {
                // Extract category title
                var fromHere = menuData.indexOf('<h2>') + 4;
                var toHere = menuData.indexOf('</h2>') - fromHere;
                self.categoryTitle = menuData.substr(fromHere, toHere);

                //angularize menu anchors
                menuData = menuData.replace(/(#)(\w+)/g, '#/categories/' + page + '/$2');
                self.menuData = menuData;
            }
            /**
             * @ngdoc method
             * @name scrollToSection
             * @methodOf insideApp.controller:CategoryCtrl
             * @description - scroll to a section in a page
             */
            self.scrollToSection = function (section) {
                $anchorScroll(section);
            };

            $timeout(function() {
                if (self.section != '') {
                    self.scrollToSection(self.section);
                } else {
                    $anchorScroll();
                }
            });
        }]);
