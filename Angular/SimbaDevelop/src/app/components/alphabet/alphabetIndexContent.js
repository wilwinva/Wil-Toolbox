
angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:AlphabetIndexContentCtrl
     * @description Controller for the A-Z index
     */
    .controller('AlphabetIndexContentCtrl', ['curlData', '$title', '$letter', function (data, title, letter) {
        this.data = data;
        this.title = title;
        this.letter = letter;
    }]);
