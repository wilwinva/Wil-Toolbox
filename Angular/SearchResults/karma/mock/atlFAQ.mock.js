'use strict';

angular.module('mockedAtlResults', [])
  .value('FAQ',
    {
      "name": "ATL3.10.0+06162016",
      "type": "json",
      "count": "2",
      "user": "awshwer",
      "userIsManager": "false",
      "userLocationId": "0003",
      "processTime": "464",
      "content": [
        {
          "title": "Most+Asked+Questions",
          "link": "https://MAQs.sandia.gov",
          "source": "ATL_MAQ",
          "processTime": "107",
          "isPersonalized": "false",
          "isLocationAware": "false",
          "payloadType": "JSON",
          "payload": [
            {
              "questions": [
                {
                  "question": "Do+I+have+to+use+the+Designated+Travel+Agencies+%28DTA%29+for+business+travel%3F",
                  "answer": "%3Cp%3EMake+initial+and+alternative+travel+reservations+%28when+travel+is+disrupted+%5Be.g.%2C+weather%2C+airline+mechanical+issues%2C+etc.%5D%29+with+the+DTA+so+that+Sandia%26amp%3B%238217%3Bs+Emergency+Operations+Center+to+reach+you+with+important+updates+on+adverse+conditions+that+may+impact+your+safety.%3C%2Fp%3E%0D%0A%3Cp%3EThe+following+exceptions+to+using+the+%3Ca+href%3D%22%23termid%3D344%22%3EDTA%3C%2Fa%3E+must+be+entered+into+the+%3Ca+href%3D%22https%3A%2F%2Fmytrips.travelsecurity.com%2FLogin.aspx%3Fci%3DopKR%252fZm1YL0%253d%22%3EISOS+Travel+Tracker%3C%2Fa%3E+to+ensure+employee+location+is+known+to+Sandia+Emergency+Operations%3A%3C%2Fp%3E%0D%0A%3Cul%3E%0D%0A%3Cli%3EConferences+%26amp%3B%238211%3B+traveler+may+book+lodging+accommodations+directly+with+a+conference+hotel.%3C%2Fli%3E%0D%0A%3Cli%3EHost%2Fhostess+allowance+%26amp%3B%238211%3B+traveler+may+be+reimbursed+up+to+%2415+per+day+for+a+nominal+gift+%28excluding+cash+or+liquor%29+given+to+individuals+who+provide+lodging+in+lieu+of+hotel+lodging.%3C%2Fli%3E%0D%0A%3Cli%3EInternational+hotel+reservations+not+booked+through+the+DTA+per+Embassy+or+other+security+recommendations.+See+%3Ca+href%3D%22https%3A%2F%2Finfo.sandia.gov%2Fcps%2Fintegrated_safeguards_security%2Fpolicy%2Fprocesses%2Fprocedures%2FISS100.4.2.html%22%3EISS100.4.2%3C%2Fa%3E%2C+%3Cem%3EControl+International+Travel%2C+for+International+lodging.%3C%2Fem%3E%3C%2Fli%3E%0D%0A%3Cli%3EInternational+rail+transportation+not+available+via+DTA+booking.%3C%2Fli%3E%0D%0A%3Cli%3EBusiness+travel+using+a+personally+owned+or+government+vehicle.%3C%2Fli%3E%0D%0A%3Cli%3EDirect+booking+with+a+conference+hotel.%3C%2Fli%3E%0D%0A%3Cli%3EAny+other+travel+arrangement+not+booked+through+the+DTA+for+an+approved+reason.%3C%2Fli%3E%0D%0A%3C%2Ful%3E",
                  "smes": [
                    {
                      "smeName": "Mia Schofield",
                      "smeEmail": "mschofi@sandia.gov"
                    }
                  ],
                  "rcps": [
                    {
                      "rcpDescription": "HR100.4.16, Buy Vacation and Use Vacation Buy",
                      "rcpLink": "https://whatever.com"
                    }
                  ]
                },
                {
                  "question": "Are+there+exceptions+to+using+the+DTA+for+business+travel%3F",
                  "answer": "Just another canned answer that really means nothing but is just taking up space for us to play with the design.",
                  "smes": [
                    {
                      "smeName": "Busta Move",
                      "smeEmail": "bmove@sandia.gov"
                    }
                  ],
                  "rcps": []
                }
              ]
            }
          ]
        }
      ]
    }
  )
  .value('Error code', {});
