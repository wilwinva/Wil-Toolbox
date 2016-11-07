'use strict';

angular.module('mockedAtlResults', [])
  .value('ORGS',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "1",
      "user": "wbweath",
      "processTime": "2079",
      "content": [
        {
          "title": "Corporate+Information+Mgmt",
          "link": "https%3A%2F%2Fsharepoint.sandia.gov %2Fsites%2Fiss%2FPages%2Fdepts.aspx%3Fgroup%3D9530",
          "description": "%26%239734%3B+The+link+to+the+homepage +for+organization+09530.",
          "source": "ORGS_ATL",
          "processTime": "2076",
          "isPersonalized": "false",
          "payloadType": "JSON",
          "payload": [
            {
              "displayType": "result top"
            },
            {
              "managerPicUrl": "https://prod.sandia.gov/cgi-bin/badge /badge_access.pl/481523.JPG"
            },
            {
              "managerName": " William R. Cook"
            },
            {
              "orgDescriptiveTitle": "Organization  "
            },
            {
              "managerPhone": "5058447429"
            },
            {
              "managerMobile": "5053791059"
            },
            {
              "managerID": "7538"
            },
            {
              "managerTitle": "SR MGR"
            },
            {
              "secretaryPhone": "5058441658"
            },
            {
              "secretaryMobile": "5056005500"
            },
            {
              "secretaryName": "Ashley  Wyatt"
            },
            {
              "secretaryBadgePhotoLink": "https://prod.sandia.gov/cgi-bin/badge/badge_access.pl/858886.JPG"
            },
            {
              "secretaryID": "281023"
            }
          ]
        }
      ]
    }
  )
  .value('Error code', {});
