'use strict';

angular.module('mockedAtlResults', [])
  .value('SPELLING',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "1",
      "user": "wbweath",
      "processTime": "36",
      "content": [
        {
          "title": "Spelling+Correction",
          "link": "https%3A%2F%2Fwebprod.sandia.gov%2FSearchPointNext %2Fsearch.html%3Fcoll%3Dsnl1%26pageBegin%3D0%26query%3Dsecurity%2520forms",
          "description": "%26%239734 %3B+Spelling+Correction%3A+security+forms",
          "source": "SPELLING_ATL",
          "processTime": "33",
          "isPersonalized": "false",
          "payloadType": "JSON",
          "payload": {
            "correction": "security forms"
          }
        }
      ]
    }
  )
  .value('Error code', {});
