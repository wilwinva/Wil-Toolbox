/**
 * Command options for S4/S5 network switches
 */
'use strict';

angular.module('vactApp.hardwareCommands', [])
    .controller('vactNetworkCtrl', ['vactModel', function (vactModel) {

        /**
         * Set the active network connection
         *
         * @param id string     The device id
         * @param network string
         */
        this.set = function (id, network) {
            var requestData = {id: id, options:{ network: network}};
            vactModel.sendRequest(requestData);
        };

        /**
         * Restart the session
         *
         * @param id string    The device id
         */
        this.restart = function (id) {
            var requestData = {id: id};
            vactModel.sendRequest(requestData);
        };
    }]);
