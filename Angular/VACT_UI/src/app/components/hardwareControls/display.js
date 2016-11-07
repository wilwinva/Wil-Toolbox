/**
 * Command options for displays and monitors
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactDisplayCtrl', ['vactModel', function (vactModel) {

        /**
         * Activate or deactive PIP on display
         *
         * @param id string     The device id
         * @param on boolean
         */
        this.pip = function (id, on) {
            var requestData = {id: id, options:{ pip: on}};
            vactModel.sendRequest(requestData);
        };

        /**
         * Activate or deactive screen
         *
         * @param id string    The device id
         * @param on boolean
         */
        this.screen = function (id, on) {
            var requestData = {id: id, options:{ screen: on}};
            vactModel.sendRequest(requestData);
        };
    }]);

