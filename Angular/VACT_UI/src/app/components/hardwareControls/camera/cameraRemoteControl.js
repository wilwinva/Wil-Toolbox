/**
 * Display buttons for user to interact with camera
 */
'use strict';

angular.module('vactApp.hardwareCommands')
    .directive('vactCameraRemoteControl', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                camid: '@'
            },
            templateUrl: 'app/components/hardwareControls/camera/cameraRemoteControl.tpl.html',
            controller: 'vactCameraCtrl',
            controllerAs: 'camera'
        };
    });
