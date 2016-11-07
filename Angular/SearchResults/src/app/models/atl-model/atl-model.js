'use strict';

/**
 * @ngdoc function
 * @name searchResultsApp.module:models
 * @description
 * # atlModel
 * atlModel of the searchResultsApp
 */

angular.module('searchResultsApp.models.atl', ['searchResultsApp.config.constants'])
  .service('atlModel', ['$q', '$http', '$timeout', 'ENV',
    function AtlModel($q, $http, $timeout, ENV) {
      var atlModel = this;

      atlModel.fetchAtls = function (term) {
        var deferred = $q.defer();
        var useableUrl = ENV.atlUrl + '&term=' + encodeURIComponent(term);
        /*
         $timeout(function(){
         deferred.reject({error: 400, message: 'The ATL request timed out!'});
         },30000);*/

        return $http.jsonp(useableUrl, {cache: true, timeout: 10000}).then(function successHandler(response) {

          var responseDetails = [];

          var tempData = response.data.content;
          var tempDataCount = tempData.length;
          if (tempDataCount > 0) {
            //need to create a new array element to hold the other payload contents
            var tempArray = [];
            //need to loop through the content objects and add each one to the new array
            var specialATL = false;
            var mapATLCount = 0;
            for (var a = 0; a < tempDataCount; a++) {
              var myTempObj = tempData[a];
              if (myTempObj.source != "ATL_SBB") {
                if (myTempObj.source == 'SPELLING_ATL') {
                  myTempObj.link = ENV.appUrl + myTempObj.payload.correction;
                }
                if (myTempObj.source == 'ATL_FORM' || myTempObj.source == 'ATL_Policy'  || myTempObj.source == 'SPELLING_ATL') {//only needed for Form JIT, Policy Spelling ATLs
                  specialATL = true;
                }
                if (myTempObj.source == 'ATL_MAP') {
                  mapATLCount++;
                  /*
                   if(myTempObj.title == "cafe" || myTempObj.title == "cafeteria"|| myTempObj.title == "thunderbird cafe"){
                   mapATLCount++; // increment the count again so they aren't pushed, this will be later changed to actually hard code the cafeteria building number in
                   }*/
                }

                /*if(myTempObj.source == 'JIT_ATL'){
                 tempArray.push(myTempObj); // increment the count again so they aren't pushed, this will be later changed to actually hard code the cafeteria building number in
                 //mapATLCount= 2;

                 }*/

                if (mapATLCount < 2)
                  tempArray.push(myTempObj);
              }
            }
            tempData = tempArray;
            tempDataCount = tempData.length;
            tempArray = [];

            if (specialATL) {//only needed for Form JIT, Policy Spelling ATLs
              //need to for loop through tempData - there could be an ATL_FORM and a SPELLING_ATL and need to add both
              var localObj = {};
              for (var a = 0; a < tempDataCount; a++) {
                var myTempObj = tempData[a];
                if (myTempObj.source != 'ATL_FORM' && myTempObj.source != 'ATL_Policy') {
                  console.info("got into this with tempDataCount of " + tempDataCount);
                  if (tempDataCount > 1) {
                    tempArray.push(myTempObj);
                  }
                } else {
                  if (!localObj.source) {
                    console.info('creating the source stuff' + myTempObj.source);
                    //need to make a key/value pair for "source":"ATL_FORM";
                    localObj.source = myTempObj.source;
                    localObj.count = 0;
                    localObj.payload = [];
                  }
                  //need to make a key/value pair for "count":???whatever the length is from the new array;
                  localObj.count++;
                  //need to replace the content key/value of orginal array tempObj
                  localObj.payload.push(myTempObj);
                }
              }
              if (localObj.source) {
                //need to push localObj into tempData
                tempArray.push(localObj);
              }
            }
            //console.log('$$ ' + tempData + ' finished preprocessing');
            if (tempArray.length > 0) {
              tempData = tempArray;
            }
          }
          var tempDataLength = tempData.length;
          if (tempDataLength === 1) {
            if (tempData[0].source == 'ATL_VB') {//only needed for Vacation Balance ATL
              console.info("got in here");
              tempData[0].payload = [tempData[0].description];
              //responseDetails.push(tempData[0]);
              console.info(tempData[0].payload);
            }
            responseDetails = tempData;
            // responseDetails[0].atlType = tempData[0].source;
          } else {
            var faqATL;
            for (var a = 0; a < tempDataLength; a++) {//set atlType and make sure json structure has payload
              var tempObj = tempData[a];

              //console.log('*******tempObj' + tempObj + " == " + tempObj.source);
              if ('payload' in tempObj) {
                if (tempObj.source == 'ATL_FAQ') { // wait to push last so it will be the first ATL on the right
                  faqATL = tempObj;
                }
                else {
                  responseDetails.push(tempObj);
                }
              } else if (tempObj.source == 'ATL_VB') {//only needed for Vacation Balance ATL
                tempObj.payload = [tempObj.description];
                responseDetails.push(tempObj);
                console.info(tempObj.payload);
                console.info('was the payload fro vacation balance');
              } else if (tempObj.source == 'ATL_MAP') {
                responseDetails.push(tempObj);
              }
            }
            if (faqATL) {//add FAQ to top of results
              responseDetails.unshift(faqATL);
            }
          }
          return responseDetails;
        }, function () {
          return null;
        });
      };
    }
  ]);
