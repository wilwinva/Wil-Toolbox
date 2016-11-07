/**
 * Command options for TV overlay controller
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactOverlayCtrl', ['vactModel', function (vactModel) {

        /**
         * Set overlay content
         *
         * @param id string     The device id
         * @param data string
         */
        this.set = function (id, data) {
            var requestData = {id: id, options:{ data: data}};
            vactModel.sendRequest(requestData);
        };

        /**
         * Activate or deactive overlay
         *
         * @param id string    The device id
         * @param on boolean
         */
        this.activate = function (id, on) {
            var requestData = {id: id, options:{ active: on}};
            vactModel.sendRequest(requestData);
        };
    }]);
