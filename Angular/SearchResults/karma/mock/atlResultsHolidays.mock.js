'use strict';

angular.module('mockedAtlResults', [])
  .value('HOLIDAYS',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "2",
      "user": "lkegler",
      "processTime": "207",
      "content": [
        {
          "title": "Holiday+Schedule+for+FY16",
          "link": "https%3A%2F%2Fsharepoint.sandia.gov%2Fsites%2Ffinance%2Fcontroller-ops%2Fpayroll-services%2FPages%2Fholidays.aspx",
          "description": "%26%239734%3B+Holiday+Schedule+for+FY16",
          "source": "HOLIDAYS_ATL",
          "processTime": "0",
          "isPersonalized": "false",
          "payloadType": "JSON",
          "payload": [
            {
              "label": "Thanksgiving",
              "date": "Nov. 26, 2015"
            },
            {
              "label": "Energy Conservation Day",
              "date": "Nov. 27, 2015"
            },
            {
              "label": "Winter Shutdown",
              "date": "Dec 25, 2015 - Jan 1, 2016"
            },
            {
              "label": "Memorial Day",
              "date": "May 30, 2016"
            },
            {
              "label": "Independence Day",
              "date": "July 4, 2016"
            },
            {
              "label": "Labor Day",
              "date": "Sep. 5, 2016"
            }
          ]
        },
        {
          "title": "Link+to+your+vacation+balance+page",
          "link": "https%3A%2F%2Fhrss.sandia.gov%2Fpsp%2Fpspr1%2FEMPLOYEE%2FHRMS%2Fc%2FSL_ROLE_EMPLOYEE.SL_W3EB_LEAVBAL.GBL%3FNAVSTACK%3DClear%26PORTALPARAM_PTCNAV%3DSL_W3EB_LEAVBAL_GBL%26EOPP.SCNode%3DHRMS%26EOPP.SCPortal%3DEMPLOYEE%26EOPP.SCName%3DCO_EMPLOYEE_SELF_SERVICE%26EOPP.SCLabel%3DHR%2520Self%2520Service%26EOPP.SCPTfname%3DCO_EMPLOYEE_SELF_SERVICE%26FolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_TIME_REPORTING.SL_W3EB_LEAVBAL_GBL%26IsFolder%3Dfalse",
          "description": "%26%239734%3B+As+of+01%2F07%2F2016+your+balances+are%3A++vacation%3A+27.00%2C+vacationbuy%3A+80.00%2C+flex%3A+7.00%2C+holiday%3A+-5.00%2C+pto%3A+0.00%2C+convertible%3A+0.00",
          "source": "ATL_VB",
          "processTime": "207",
          "isPersonalized": "true"
        }
      ]
    }
  )
  .value('Error code', {});
