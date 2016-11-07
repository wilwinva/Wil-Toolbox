'use strict';

angular.module('mockedAtlResults', [])
  .value('HOT_TOPICS',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "1",
      "user": "wbweath",
      "processTime": "14",
      "content": [
        {
          "title": "Currently+Trending+Topics",
          "link": "https%3A%2F%2Fmy.sandia.gov%2F",
          "description": "%26%239734%3B+The+currently+trending+search+topics+within+Sandia+National+Laboratories.",
          "source": "HOTTOPICS_ATL",
          "processTime": "0",
          "isPersonalized": "false",
          "payloadType": "JSON",
          "payload": [
            "time charging",
            "holidays",
            "ims",
            "maps",
            "cchd",
            "payroll",
            "metagroup",
            "jit",
            "teds",
            "hr queries"
          ]
        }
      ]
    }
  )
  .value('Error code', {});
