'use strict';

angular.module('insideApp')
/**
 * @ngdoc controller
 * @name insideApp.controller:LinksCtrl
 * @description Links Controller of the insideApp
 */.controller('LinksCtrl', ['$scope', '$sce', '$timeout', 'ngDialog', 'API_URL', 'ENV', 'insideApiModel',
        function ($scope, $sce, $timeout, ngDialog, API_URL, ENV, insideApiModel) {
            var self = this;
            self.fetching = true;

            $timeout(function () {
                insideApiModel.fetch(API_URL[$scope.url], null, false).then(
                    function successHandler(data) {
                        //reset error
                        $scope.error = false;
                        self.error = false;

                        // Clean the group and link text.  Group names and link descriptions are encoded.
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                clean(data[key], 'name');
                                for (var x = 0; x < data[key].links.length; x++) {
                                    clean(data[key].links[x], 'description');
                                }
                            }
                        }

                        function clean(obj, key) {
                            var keyVal = key;
                            var str = obj[keyVal].replace(/&amp;/g, '&');
                            str = str.replace(/&lt;/g, '<');
                            str = str.replace(/&gt;/g, '>');
                            str = str.replace(/&quot;/g, '"');
                            str = str.replace(/&#39;/g, '\'');

                            try {
                                str = decodeURIComponent(str);
                            }
                            catch (e) {
                                // String most likely has patterns that cause decodeURIComponent to fail. (###)
                                // Just leave as is.
                            }
                            obj[keyVal] = str;
                        }

                        self.fetching = false;
                        self.data = data;
                    }, function errorHandler(reason) {
                        console.error('Unable to retrieve links: ' + reason);
                        $scope.error = true;
                        self.error = true;
                        self.data = [];
                        self.fetching = false;
                    });
            });

            /**
             * @ngdoc method
             * @name getTemplateUrl
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.getTemplateUrl = function () {
                return $scope.template;
            };

            /**
             * @ngdoc method
             * @name groupAdd
             * @methodOf insideApp.controller:AlertsCtrl
             * @description -
             */
            self.groupAdd = function (groupName, order) {
                return $timeout(function () {
                    if (self.validate('group', groupName)) {
                        if (order == 'new') { // 'new' is used on the "Add group" button.
                            if (self.data[0].name == 'tempHoldingGroup') { // if there is a temp group, it has order of one.  Use 2 here.
                                order = 2;
                            }
                        }
                        var newGroupData = {
                            name: groupName,
                            sort_order: order
                        };

                        return insideApiModel.add(API_URL.groups, newGroupData).then(
                            function successHandler(newGroupId) {
                                // Model will update when the array is modified and an automatic redraw
                                // of the ng-repeat will occur.
                                self.data.unshift({
                                    expanded: "1",
                                    id: newGroupId,
                                    links: [],
                                    sort_order: order,
                                    name: groupName
                                });
                                angular.element('#LinksReport').scope().headingAdd = false; // Hide it manually since the function will return truthy by default
                            },
                            function errorHandler(reason) {
                                console.error('Error adding link group: ' + reason);
                                $scope.error = true;
                                self.error = true;
                                self.data = [];
                            });
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            };

            /**
             * @ngdoc method
             * @name groupEdit
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.groupEdit = function (groupId, groupName, startPos, stopPos) {
                $timeout(function () {
                    if (self.validate('group', groupName)) {
                        var offset = 2;
                        if (self.data[0].name == 'tempHoldingGroup'){
                            offset = 3;
                        }
                        var data = {
                            name: groupName,
                            sort_order: stopPos + offset
                        };
                        insideApiModel.edit(API_URL.groups, groupId, data).catch(
                            function errorHandler(reason) {
                                console.error('Error editing link group: ' + reason);
                                $scope.error = true;
                                self.error = true;
                                self.data = [];
                            });

                        return true;
                    }
                    else {
                        return false;
                    }
                });
            };

            /**
             * @ngdoc method
             * @name groupDelete
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.groupDelete = function (groupId, silent) {
                if (!silent) {
                    ngDialog.openConfirm({
                            template: 'app/components/portlet/api/portlets/links/deleteGroup.tpl.html',
                            className: 'ngdialog-theme-default', scope: $scope
                        })
                        .then(function (success) { // confirm
                            doDelete();
                        }, function (error) { // cancel
                            return false;
                        });
                }
                else {
                    doDelete();
                }

                function doDelete() {
                    $timeout(function () {
                        insideApiModel.delete(API_URL.groups, groupId).then(
                            function successHandler(response) {
                                self.data = $.grep(self.data, function (e) {
                                    return e.id != groupId;
                                });
                            }, function errorHandler(reason) {
                                console.error('Error deleting link group: ' + reason);
                                $scope.error = true;
                                self.error = true;
                                self.data = [];
                            });

                    });
                }
            };

            /**
             * @ngdoc method
             * @name addLinkWithoutGroup
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.addLinkWithoutGroup = function (linkDescription, url, newWindow) {
                if (self.validate('link', linkDescription, url)) {
                    if (self.data[0].name != 'tempHoldingGroup') { // A temp group doesn't exist to hold the new link.
                        var x = self.groupAdd('tempHoldingGroup', 1);
                        x.then(function () {
                            var groupId = self.data[0].id;
                            self.linkAdd(linkDescription, url, newWindow, groupId, 1); // Now add the new link to the new temp group.
                        });
                    }
                    else {
                        // Temp group exists...
                        var groupId = self.data[0].id; // get its id...
                        self.linkAdd(linkDescription, url, newWindow, groupId, 1); // add the link to it.
                    }
                    return false;
                }
                else {
                    return true;
                }
            };

            /**
             * @ngdoc method
             * @name linkAdd
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.linkAdd = function (linkDescription, url, newWindow, groupId) {
                $timeout(function () {
                    if (self.validate('link', linkDescription, url)) {
                        var data = {
                            description: linkDescription,
                            new_window: newWindow,
                            url: url,
                            group_id: groupId
                        };

                        insideApiModel.add(API_URL.links, data).then(
                            function successHandler(linkId) {
                                // update the model's data.
                                var groupPos = self.data.map(function (x) {
                                    return x.id;
                                }).indexOf(groupId); // get the index of the group.
                                self.data[groupPos].links.unshift({ // add the link to this group in the model.
                                    id: linkId,
                                    sort_order: 1,
                                    description: linkDescription,
                                    new_window: newWindow,
                                    group_id: groupId,
                                    url: url
                                });
                            }, function errorHandler(reason) {
                                console.error('Error adding link: ' + reason);
                                $scope.error = true;
                                self.error = true;
                                self.data = [];
                            });

                        return false;
                    }
                    else {
                        return true;
                    }
                });
            };

            /**
             * @ngdoc method
             * @name linkEdit
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.linkEdit = function (linkId, linkDescription, newWindow, url, endGroupId, startGroupId, order, ui) {
                $timeout(function () {
                    var error = self.validate('link', linkDescription, url);
                    if (error) {
                        // Called with the edit icon and when a drag event has occurred.
                        var data = {
                            description: linkDescription,
                            new_window: newWindow,
                            url: url,
                            group_id: endGroupId,
                            sort_order: order
                        };

                        insideApiModel.edit(API_URL.links, linkId, data).then(
                            function successHandler(response) {
                                // Detect link position and whether it has been moved to a new group so we can update the model.
                                if (endGroupId != startGroupId) { // link has been moved to a new group.
                                    // Get old link and group position data.
                                    var groupPos1 = self.data.map(function (x) {
                                        return x.id.toString();
                                    }).indexOf(startGroupId.toString());
                                    var groupPos2 = self.data.map(function (x) {
                                        return x.id.toString();
                                    }).indexOf(endGroupId.toString());
                                    var linkPos = self.data[groupPos1].links.map(function (x) {
                                        return x.id.toString();
                                    }).indexOf(linkId.toString());
                                    var curLink = self.data[groupPos1].links[linkPos];
                                    // remove link from old group.
                                    self.data[groupPos1].links.splice(parseInt(linkPos), 1);
                                    // Add link to new group
                                    self.data[groupPos2].links.splice(order - 1, 0, curLink);
                                    // Remove sortable li.  The model is updated and re-rendered with the correct elements in place.
                                    // There's no need for the dropped sortable li dom element.
                                    ui.item.remove();
                                }
                                else { // link is in same group.
                                    var groupPos = self.data.map(function (x) {
                                        return x.id.toString();
                                    }).indexOf(startGroupId.toString());
                                    var linkPos = self.data[groupPos].links.map(function (x) {
                                        return x.id.toString();
                                    }).indexOf(linkId.toString());
                                    var curLink = self.data[groupPos].links[linkPos];

                                    // remove link from old position.
                                    self.data[groupPos].links.splice(parseInt(linkPos), 1);
                                    // Add link to new position
                                    if (typeof (order) == 'undefined'){
                                        order = linkPos+1;
                                    }
                                    self.data[groupPos].links.splice(order - 1, 0, curLink);
                                }

                            }, function errorHandler(reason) {
                                console.error('Error editing link: ' + reason);
                                $scope.error = true;
                                self.error = true;
                                self.data = [];
                            });

                        return false;
                    }
                    else {
                        return true;
                    }
                });
            };

            /**
             * @ngdoc method
             * @name linkDelete
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.linkDelete = function (linkId, groupId, obj, $event) {
                $timeout(function () {
                    // Throw up a confirmation box.
                    ngDialog.openConfirm({
                            template: 'app/components/portlet/api/portlets/links/deleteLink.tpl.html',
                            className: 'ngdialog-theme-default', scope: $scope
                        })
                        .then(function (success) { // confirm
                            insideApiModel.delete(API_URL.links, linkId).then(
                                function successHandler(response) {
                                    // Get position of the deleted link to update the model without it.
                                    var groupPos = self.data.map(function (x) {
                                        return x.id; // some db will return string, use x.id.tostring();
                                    }).indexOf(groupId);

                                    var linkPos = self.data[groupPos].links.map(function (x) {
                                        return x.id;
                                    }).indexOf(linkId);
                                    self.data[groupPos].links.splice(linkPos, 1);

                                }, function errorHandler(reason) {
                                    console.error('Error deleting link: ' + reason);
                                    $scope.error = true;
                                    self.error = true;
                                    self.data = [];
                                });

                        }, function (error) { // cancel
                            return false;
                        });
                });
            };

            /**
             * @ngdoc method
             * @name updateGroupExpanded
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.updateGroupExpanded = function (groupId, expanded) {
                var exp = expanded ? '1' : '0';
                var data = {
                    expanded: exp
                };

                $timeout(function () {
                    insideApiModel.edit(API_URL.groups, groupId, data).then(
                        function successHandler(response) {
                        }, function errorHandler(reason) {
                            console.error('Error updating link group expanded: ' + reason);
                            $scope.error = true;
                            self.error = true;
                            self.data = [];
                        });
                });
            };

            /**
             * @ngdoc method
             * @name validate
             * @methodOf insideApp.controller:LinksCtrl
             * @description -
             */
            self.validate = function (type, description, url) {
                var returnVal = true;
                var error = false;
                var INVALID_REGEXP = /[^\w\s\(\)\-\&\'\.\!\/\,\;]/;

                if (type == 'link') {
                    if (description == "" && url == "") {
                        returnVal = false;
                        error = "\n\nPlease enter a Link URL and the Link Text\n";
                    }
                    else if (description == "") {
                        returnVal = false;
                        error = "\n\nPlease enter the Link Text\n";
                    }
                    else if (INVALID_REGEXP.test(description)) {
                        returnVal = false;
                        error = "\n\nInvalid Character in Link Text " +
                            "\n\nOnly accepts alphanumeric characters\nand these special characters \/ \( \) \- \& \' \n";
                    }
                    else if (typeof url === 'undefined') {
                        returnVal = false;
                        error = "\n\nPlease format Link URL with http(s):// prefix\n";
                    }
                    else if (url == "") {
                        returnVal = false;
                        error = "\n\nPlease enter a Link URL\n";
                    }
                }

                if (type == 'group') {
                    if (description == "") {
                        returnVal = false;
                        error = "\n\nPlease enter a Group name\n";
                    }
                    else if (INVALID_REGEXP.test(description)) {
                        returnVal = false;
                        error = "\n\nInvalid Character in Group name " +
                            "\n\nOnly accepts alphanumeric characters\nand these special characters \/ \( \) \- \& \' \n";
                    }

                }

                if (error) ngDialog.open({template: error, plain: true});
                return returnVal;
            };

            $scope.$on('event:table-loading-over', function (event) {
                doSort();  // in src/apps/components/links/linksRenderer.js - applies jqueryui sortable to the link groups and items.  Must be done after DOM load.
            });
        }])
;
