/**
 * Command options for microphones
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactMicCtrl', ['vactModel', function (vactModel) {

        /**
         * Activate or deactive mute on mic
         *
         * @param id string     The device id
         * @param mute boolean
         */
        this.mute = function (id, mute) {
            var requestData = {id: id, options:{ mute: mute}};
            vactModel.sendRequest(requestData);
        };

        /**
         * Retrieve mic status
         *
         * @param id string    The device id
         * @param on boolean
         */
        this.status = function (id) {
            var requestData = {id: id};
            vactModel.sendRequest(requestData);
        };
    }]);
