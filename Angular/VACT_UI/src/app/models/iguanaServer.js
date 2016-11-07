'use strict';
angular.module('vactApp.models')
    /**
     * @ngdoc service
     * @name vactApp.service:vactModel
     * @description Web Socket Service
     */
    .factory('vactModel', ['$q', '$rootScope', function ($q, $rootScope) {

        var VactModel = {}; // We return this object to anything injecting our service
        var callbacks = {}; // Keep all pending requests here until they get responses
        var currentCallbackId = 0; // Create a unique callback ID to map requests to responses
        var ws = new WebSocket("ws://localhost:1337"); // Create our websocket object with the address to the websocket

      /**
       * @ngdoc method
       * @name onopen
       * @methodOf vactApp.service:vactModel
       * @description - WS opened
       */
        ws.onopen = function () {
            console.log("VACT: Socket has been opened!");
        };
      /**
       * @ngdoc method
       * @name onclose
       * @methodOf vactApp.service:vactModel
       * @description - WS closed
       */
        ws.onclose = function () {
            console.log("VACT: Socket has been closed!");
        };
      /**
       * @ngdoc method
       * @name onmessage
       * @methodOf vactApp.service:vactModel
       * @description - ws message received
       */
        ws.onmessage = function (message) {
            var rcvdMsg = JSON.parse(message.data);
            if (rcvdMsg.event && rcvdMsg.event === 'switch') {
                console.log('Received routing switch msg switch input ' + rcvdMsg.input + ' to output ' + rcvdMsg.output);
                console.log('TODO: update mySQL tables for routing switcher to read new config');
            }
            else {
            console.log("VACT: message has been received!");
            listener(rcvdMsg);
            }
        };

      /**
       * @ngdoc method
       * @name sendRequest
       * @methodOf vactApp.service:vactModel
       * @description - send a request
       */
        VactModel.sendRequest = function(request) {
            var defer = $q.defer();
            var callbackId = getCallbackId();
            callbacks[callbackId] = {
                time: new Date(),
                cb: defer
            };
            request.callback_id = callbackId;
            console.log('VACT: Sending request', request);
            ws.send(JSON.stringify(request));
            return defer.promise;
        };

        function listener(data) {
            var messageObj = data;
            console.log("VACT: Received data from websocket: ", messageObj);
            // If an object exists with callback_id in our callbacks object, resolve it
            if (callbacks.hasOwnProperty(messageObj.callback_id)) {
                console.log(callbacks[messageObj.callback_id]);
                $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
                delete callbacks[messageObj.callbackID];
            }
        }

        // This creates a new callback ID for a request
        function getCallbackId() {
            currentCallbackId += 1;
            if (currentCallbackId > 10000) {
                currentCallbackId = 0;
            }
            return currentCallbackId;
        }

      /**
       * @ngdoc method
       * @name getEquipment
       * @methodOf vactApp.service:vactModel
       * @description - Define a "getter" for getting room equipment data
       */
        VactModel.getEquipment = function () {
            var request = {
                type: "get_equipment"
            };
            // Storing in a variable for clarity on what sendRequest returns
            var promise = this.sendRequest(request);
            return promise;
        };

        return VactModel;
    }])
;
