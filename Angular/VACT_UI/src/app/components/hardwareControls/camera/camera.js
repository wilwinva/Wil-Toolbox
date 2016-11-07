/**
 * Command options for cameras
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactCameraCtrl', ['$scope', 'vactModel', function ($scope, vactModel) {

        this.id = $scope.camid;

        // Save preset data to given camera
        this.presetStore = function (cameraId, data) {
            var requestData = data;
            vactModel.sendRequest(requestData);
        };

        // Activate a preset
        this.presetActivate = function (presetNum) {
            // A preset id contains all preset info, including camera source
            var requestData = presetNum;
            vactModel.sendRequest(requestData);
        };

        // Clear a preset from memory
        this.presetClear = function (presetNum) {
            var requestData = presetNum;
            vactModel.sendRequest(requestData);
        };

        /**
         * Move the camera
         *
         * @id The camera's device id
         * @direction Describes how to move the camera
         *      Pan/tilt with: 'up', 'down', 'left', 'right'
         *      Zoom with: 'in', 'out'
         *      Halt camera with: 'stop'
         */
        this.move = function (id, direction) {
            console.log('Moved camera '+id+' '+direction);
            var requestData = {
                id: id,
                options: {
                    move: direction
                }
            };
            vactModel.sendRequest(requestData);
        };
    }]);
