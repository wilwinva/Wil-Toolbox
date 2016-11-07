/**
 * Command options for LED signage
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactLedCtrl', ['vactModel', function (vactModel) {

        /**
         * Set the LED signage on display
         *
         * @param id string     The device id
         * @param message string   The display message
         */
        this.set = function (id, message) {
            var requestData = {id: id, options:{ message: message}};
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
