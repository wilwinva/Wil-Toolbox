'use strict';

angular.module('mockedSapleAtlResults', [])
  .value('SAPLE',
  {
    "endIndex": 2,
    "sapleVersion": "2.7.4.3",
    "searchID": 60322,
    "searchTime": 0.06,
    "showVisitors": false,
    "startIndex": 1,
    "totalResults": 2,
    "noNamespaceSchemaLocation": "saple.xsd",
    "query": {
      "input": "holiday",
      "queryPart": {
        "type": "FUZZY_SEARCH_TOKENS",
        "value": "holiday"
      }
    },
    "result": [
      {
        "confidence": "high",
        "score": 1.0000,
        "name": {
          "first": {
            "value": "Chavez"
          },
          "last": {
            "value": "Holiday"
          },
          "prettyName": {
            "value": "Chavez Holiday"
          }
        },
        "job": {
          "type": {
            "value": "PO Contractor"
          },
          "contractCompany": {
            "value": "Us Electrical Corporation"
          }
        },
        "org": {
          "number": {
            "value": "048221"
          },
          "title": {
            "value": "Fixed-Price Construction Contr"
          },
          "manager": {
            "value": "18042"
          },
          "secretary": {
            "value": "113328"
          }
        },
        "misc": {
          "snlid": {
            "value": "265092"
          },
          "badgephoto": {
            "value": "https://prod .sandia.gov/cgi-bin/badge/badge_access.pl/832204.JPG"
          }
        },
        "location": {
          "mailstop": {
            "value": "0905"
          }
        }
      },
      {
        "confidence": "high",
        "score": 1.0000,
        "name": {
          "first": {
            "value": "Wendall"
          },
          "secondary": {
            "value": "R."
          },
          "last": {
            "value": "Holiday"
          },
          "prettyName": {
            "value": "Wendall R. Holiday"
          }
        },
        "job": {
          "type": {
            "value": "Employee"
          },
          "title": {},
          "occupation": {
            "value": "Electronics Technologist"
          },
          "jobFamily": {
            "value": "Research & Development"
          },
          "managerLevel": {
            "value": "90"
          }
        },
        "org": {
          "number": {
            "value": "02665"
          },
          "title": {
            "value": "Flight & Instrumentation Sys."
          },
          "link": {
            "value": "https://sharepoint.sandia.gov/sites/EDI/Pages/2665.aspx"
          },
          "manager": {
            "value": "15714"
          },
          "secretary": {
            "value": "63840"
          }
        },
        "misc": {
          "userid": {
            "value": "wrholid"
          },
          "snlid": {
            "value": "11407"
          },
          "email": {
            "value": "wrholid@sandia.gov"
          },
          "badgephoto": {
            "value": "https://prod.sandia.gov/cgi-bin/badge/badge_access .pl/818739.JPG"
          }
        },
        "location": {
          "building": {
            "value": "890"
          },
          "room": {
            "value": "3498F"
          },
          "area": {
            "value": "TA1"
          },
          "site": {
            "value": "SNLNM"
          },
          "mailstop": {
            "value": "0986"
          }
        },
        "phone": {
          "office": {
            "value": "5058446824"
          },
          "fax": {
            "value": "5058449554"
          }
        }
      }
    ]
  }
)
  .value('Error code', {});
