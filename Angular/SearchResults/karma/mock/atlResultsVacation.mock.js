'use strict';

angular.module('mockedVacationAtlResults', [])
  .value('ATLS',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "2",
      "user": "lkegler",
      "processTime": "184",
      "content": [
        {
          "title": "HR100.5.11+Record+Employee+Absences%2C+Corporate+Training%2C+and+Disciplinary+Actions",
          "link": "http%3A%2F%2Finfo.sandia.gov%2Fcps%2Fhuman_resources%2Fpolicy%2Fprocesses%2Fprocedures%2FHR100.5.11.html",
          "description": "%26%239734%3B+HR100.5.11+Record+Employee+Absences%2C+Corporate+Training%2C+and+Disciplinary+Actions",
          "source": "ATL_SBB",
          "processTime": "11",
          "isPersonalized": "false"
        },
        {
          "title": "Link+to+your+vacation+balance+page",
          "link": "https%3A%2F%2Fhrss.sandia.gov%2Fpsp%2Fpspr1%2FEMPLOYEE%2FHRMS%2Fc%2FSL_ROLE_EMPLOYEE.SL_W3EB_LEAVBAL.GBL%3FNAVSTACK%3DClear%26PORTALPARAM_PTCNAV%3DSL_W3EB_LEAVBAL_GBL%26EOPP.SCNode%3DHRMS%26EOPP.SCPortal%3DEMPLOYEE%26EOPP.SCName%3DCO_EMPLOYEE_SELF_SERVICE%26EOPP.SCLabel%3DHR%2520Self%2520Service%26EOPP.SCPTfname%3DCO_EMPLOYEE_SELF_SERVICE%26FolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_TIME_REPORTING.SL_W3EB_LEAVBAL_GBL%26IsFolder%3Dfalse",
          "description": "%26%239734%3B+As+of+01%2F07%2F2016+your+balances+are%3A++vacation%3A+207.00%2C+vacationbuy%3A+80.00%2C+flex%3A+7.00%2C+holiday%3A+-5.00%2C+pto%3A+0.00%2C+convertible%3A+0.00",
          "source": "ATL_VB",
          "processTime": "183",
          "isPersonalized": "true"
        }
      ]
    }
  )
  .value('Error code', {});
