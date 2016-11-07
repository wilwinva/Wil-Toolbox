'use strict';
/**
 * @ngdoc controller
 * @name vactApp.controller:RoomConfigurationCtrl
 * @description Room Configuration Methods
 */
angular.module('vactApp')
    .controller('RoomConfigurationCtrl', ['vactModel', 'equipmentData', function (vactModel, equipmentData) {
        var self = this;

      /**
       * @ngdoc property
       * @name room_properties
       * @propertyOf vactApp.controller:RoomConfigurationCtrl
       * @description
       * room_properties of the vactApp
       */
      self.room_properties = equipmentData;

        self.room_classification = 0;
        self.room_classifications = [{"label": "Unclassified", "id": 0}, {
            "label": "Classified",
            "id": 1
        }, {"label": "SPN", "id": 2}];

        self.targets = equipmentData.target;
        self.sources = equipmentData.source;
        self.secureSources =[];
        for (var sIndex = 0; sIndex < equipmentData.source.length; sIndex++) {
            if(equipmentData.source[sIndex].secured)
            {
                self.secureSources.push(equipmentData.source[sIndex]);
            }
        }

      /**
       * @ngdoc method
       * @name setRoomClassification
       * @methodOf vactApp.controller:RoomConfigurationCtrl
       * @description - set set.source based on room_classification
       * @param {string} room_classification - type of room classification (unsecure, secure, SPN)
       */
        self.setRoomClassification = function (room_classification) {
            self.room_classification = room_classification;
            var sendObj = {event: 'classification', status: self.room_classifications[room_classification].label};
            vactModel.sendRequest(sendObj);
            if(room_classification === 0){
                self.sources = equipmentData.source;
            }
            else {
                self.sources = self.secureSources;
            }
            //TODO: should we reset the targets and sources so nothing is mapped?
        };

      /**
       * @ngdoc method
       * @name targetSelected
       * @methodOf vactApp.controller:RoomConfigurationCtrl
       * @description - set source to display on a target
       * @param {string} source - what source to display on a target
       */
        self.targetSelected = function (source) {
            var newTargetId = source.target,
                prevTargetId = source.inUse,
                targetInUse = false;

            // a target can only have one source
            for (var tIndex = 0; tIndex < self.targets.length; tIndex++) {
                if (self.targets[tIndex].id === newTargetId) {
                    if (self.targets[tIndex].source && self.targets[tIndex].source !== 'none') {
                        targetInUse = true;

                        if (window.confirm(newTargetId + ' is already in use. Would you like to display this instead?')) {
                            targetInUse = false;
                            //iterate thru sources to reset this source to none
                            for (var sIndex = 0; sIndex < self.sources.length; sIndex++) {
                                if (self.sources[sIndex].id === self.targets[tIndex].source) {
                                    self.sources[sIndex].target = 'none';
                                    self.sources[sIndex].inUse = 'none';
                                    //TODO: send message?
                                    break;
                                }
                            }
                            self.targets[tIndex].source = source.id;
                            self.targets[tIndex].inUse = source.id;

                        }
                    }
                    else {
                        self.targets[tIndex].source = source.id;
                        self.targets[tIndex].inUse = source.id;
                    }
                }
                else if (prevTargetId !== 'none' && self.targets[tIndex].id === prevTargetId) {
                    self.targets[tIndex].source = 'none';
                    self.targets[tIndex].inUse = 'none';
                    //TODO: send a message?
                }
            }


            if (!targetInUse) {
                var sendObj = self.buildSendObj(source.id, source.target);
                console.log('sendObj: ' + sendObj);
            }
        };

      /**
       * @ngdoc method
       * @name sourceSelected
       * @methodOf vactApp.controller:RoomConfigurationCtrl
       * @description - set target to display on a source
       * @param {string} target - what target to display source on
       */
        self.sourceSelected = function (target) {
            //sources can be displayed on multiple targets
            var newSourceId = target.source,
                prevSourceId = target.inUse;

            for (var sIndex = 0; sIndex < self.sources.length; sIndex++) {
                if (self.sources[sIndex].id === newSourceId) {
                    self.sources[sIndex].target = target.id;
                    self.sources[sIndex].inUse = target.id;

                    var sendObj = self.buildSendObj(newSourceId, target.id);
                    console.log('sendObj: ' + sendObj);
                }
                else if (self.sources[sIndex].id === prevSourceId) {
                    self.sources[sIndex].target = 'none';
                    self.sources[sIndex].inUse = 'none';
                    //TODO: send message?
                }
            }

        };

      /**
       * @ngdoc method
       * @name buildSendObj
       * @methodOf vactApp.controller:RoomConfigurationCtrl
       * @description - build and return sendObj
       * @param {string} sourceId - sourceId to build object with
       * @param {string} targetId - targetId to build object with
       */
        self.buildSendObj = function (sourceId, targetId) {
            var sendObj = {event: 'drop', condition_1: sourceId, condition_2: targetId};
            vactModel.sendRequest(sendObj);
            //window.alert(sendObj);
            return sendObj;
        };
    }
    ])
;
