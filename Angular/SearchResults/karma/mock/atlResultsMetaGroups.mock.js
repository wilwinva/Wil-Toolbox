'use strict';

angular.module('mockedAtlResults', [])
  .value('METAGROUPS',
    {
      "name": "ATL3.7.1 01122016",
      "type": "json",
      "count": "1",
      "user": "wbweath",
      "processTime": "2090",
      "content": [
        {
          "title": "My+Metagroups",
          "link": "https%3A%2F%2Fmetagroup.sandia.gov%2Fcgi-bin%2Fmetagroup .pl",
          "description": "%26%239734%3B+Metagroups+for+logged+in+user",
          "source": "ATL_MG",
          "processTime": "31",
          "isPersonalized": "true",
          "payloadType": "JSON",
          "payload": [
            {
              "displayType": "null",
              "contentType": "JSON",
              "imageLink": "null",
              "content": {
                "count": "80",
                "data": [
                  {
                    "group": "wg-4000-dashboard",
                    "description": "This+MetaGroup+limits +access+to+the+4000+Assurance+Dashboard."
                  },
                  {
                    "group": "wg-abq-all",
                    "description": "All+accounts+%28kerberos %2C+entity%2C+and+cross-cell%29+associated+with+individuals+location+at+Sandia+Albuquerque++**This+group +includes+Foreign+Nationals**"
                  },
                  {
                    "group": "wg-ars-macro-read",
                    "description": "Allows+everyone+to+access +the+SDSS+Shared+Macros+folder"
                  },
                  {
                    "group": "wg-bruce",
                    "description": "Group+to+assist+with+allowing+individuals +to+approve+in+CSSR."
                  },
                  {
                    "group": "wg-cad-library-ac-users",
                    "description": "CAD+library+AutoCAD+users"
                  },
                  {
                    "group": "wg-cad-library-creo-users",
                    "description": "CAD+library+Creo+users"
                  },
                  {
                    "group": "wg-cad-library-ms-users",
                    "description": "CAD+library+MicroStation+users"
                  },
                  {
                    "group": "wg-cad-library-sw-users",
                    "description": "CAD +library+SolidWorks+users"
                  },
                  {
                    "group": "wg-capa-users",
                    "description": "Metagroup+to+support+CAPA+being+included +in+searchpoint.+This+group+is+also+used+by+Sigma+for+access+permissions."
                  },
                  {
                    "group": "wg-cdocs-inclusive",
                    "description": "Includes+all+metagroups+that+are+routinely+assigned+%22view+content%22+access+to+S%26S +controlled+documents"
                  },
                  {
                    "group": "wg-cee-acct-rally",
                    "description": "CEE+SRN+Rally+%28Master%29"
                  },
                  {
                    "group": "wg-cee-alc-rally",
                    "description": "CEE+SRN+Rally"
                  },
                  {
                    "group": "wg-cee-rally-ice",
                    "description": "Manually +maintained+metagroup+for+those+who+sign+up+for+CEE+Rally+who+should+be+part+of+the+%22ICE-Rally%22+instance ."
                  },
                  {
                    "group": "wg-cee-rally-pri",
                    "description": "Manually+maintained+metagroup+for+those+who+sign+up+for +CEE+Rally+who+should+be+part+of+the+%22primary%22+instance."
                  },
                  {
                    "group": "wg-cie",
                    "description": "Collaborative +Information+Environments+team+list+-+org+09531"
                  },
                  {
                    "group": "wg-cio-all",
                    "description": "Division+9000 +and+894x+orgs"
                  },
                  {
                    "group": "wg-content",
                    "description": "Members+of+this+group+have+access+to+the+Cascade +Servers+on+content-dev.sandia.gov+and+content.sandia.gov"
                  },
                  {
                    "group": "wg-corp-portal-admins",
                    "description": "Users+with+administrator+privileges+for+the+JBoss+Corporate+Portal."
                  },
                  {
                    "group": "wg-corp-portal-developers",
                    "description": "Developers+for+the+JBoss+Corporate+Portal"
                  },
                  {
                    "group": "wg-corp-portal-entityacct",
                    "description": "Entity+accounts+that+are+authorized+to+view+the+corporate+portal."
                  },
                  {
                    "group": "wg-corp-portal-project",
                    "description": "Members+of+the+JBoss+Corporate+Portal+Project."
                  },
                  {
                    "group": "wg-cps-eperson",
                    "description": "A+metagroup+to+manage+access+to+Eperson"
                  },
                  {
                    "group": "wg-credant-users",
                    "description": "Credant+Users"
                  },
                  {
                    "group": "wg-customerengagement",
                    "description": "This+metagroup+controls+the+permissions+for+the+Customer +Engagement+tool."
                  },
                  {
                    "group": "wg-cwt-greenteam",
                    "description": "Corporate+Web+Team%27s+Green+Team"
                  },
                  {
                    "group": "wg-division9000",
                    "description": "This+is+for+ALL+division+9000+MOWs"
                  },
                  {
                    "group": "wg-education",
                    "description": "Ted+Dellin%27s+Narrated+courses"
                  },
                  {
                    "group": "wg-fac-ca-filenet-all",
                    "description": "Read+access+to+all +Facilities%2FCA+files+in+the+corporate+document+management+system+%28FileNet%29.+Does+not+include+Foreign +Nationals+or+Visitors."
                  },
                  {
                    "group": "wg-fac-designdrop-read",
                    "description": "1.+Anybody+with+a+Kerberos %2C+expect+foreign+nationals+and+visitors+2%29%5Csnl%5CFacilities%5CCustomerOpsProjects%5C_DROPZONEforDesignReviews %2C+3%29+Read+access"
                  },
                  {
                    "group": "wg-fac-wfs-all",
                    "description": "Read+access+to+all+Facilities%2FNM+files +in+the+corporate+document+management+system+%28FileNet%29.+Includes+SFO.+Does+not+include+Foreign+Nationals +or+Visitors."
                  },
                  {
                    "group": "wg-fie-ssi",
                    "description": "Group+to+control+access+to+the+FIE+SSI+form+results"
                  },
                  {
                    "group": "wg-github-users",
                    "description": "Users+of+github.sandia.gov+GitHub+Enterprise+instance"
                  },
                  {
                    "group": "wg-github-users-smi",
                    "description": "MAX+16+MEMBERS+-+SMI+project+team+users+of+github.sandia .gov+GitHub+Enterprise+instance"
                  },
                  {
                    "group": "wg-gmskm",
                    "description": "Specifies+access+to+documents+referenced +by+the+Glass-Metal+Seals+Knowledge+Management+System."
                  },
                  {
                    "group": "wg-idesignit-users",
                    "description": "This+group+the+access+user+group+for+the+iDesignIt+SharePoint+site"
                  },
                  {
                    "group": "wg-ie11-list-users",
                    "description": "User+group+for+IE11+list."
                  },
                  {
                    "group": "wg-isdi-wave-user",
                    "description": "This+group+comprises +registered+users+of+the+ISDI+Wave+software+for+the+analysis+of+time-series+waveforms.++Must+be+US+Citizen ."
                  },
                  {
                    "group": "wg-lab-assessments-ect",
                    "description": "metagroup+controlling+access+to+SharePoint+ECTs +for+lab+assessments+application"
                  },
                  {
                    "group": "wg-lclearance",
                    "description": "SNL+users+with+a+L+clearance +that+are+US+citizens."
                  },
                  {
                    "group": "wg-logistics-lqms-ro-all",
                    "description": "LQMS+Read+Only+for+all+sandia ."
                  },
                  {
                    "group": "wg-maximousers",
                    "description": "Maximo+Users"
                  },
                  {
                    "group": "wg-mcs-contract-external",
                    "description": "CSS-DL+MCS+staff+outside+of+9341"
                  },
                  {
                    "group": "wg-mesa-tempaccess",
                    "description": "Users+who+can+access +%5C%5CSNL%5CMESA%5CTemp+and+%5C%5Cfs03mesant%5CTemp.+primarily+US+citizens+that+have+SRN+access+and +a+couple+of+US+citizens%27+entity+accounts."
                  },
                  {
                    "group": "wg-minitab-users",
                    "description": "Minitab+-+snl +users"
                  },
                  {
                    "group": "wg-mpst-quality-doc-user",
                    "description": "This+group+is+for+all+US+Employees%2C+all +US+Contractors+and+all+SSO+with+read+access+to+the+1830+Quality+Management+System+documents"
                  },
                  {
                    "group": "wg-mst-esh-docusers",
                    "description": "This+group+is+individuals+granted+access+to+Mfg.+S%26T+ES%26H+documents ."
                  },
                  {
                    "group": "wg-mxsr-users",
                    "description": "Maximo+Service+Request+application+users"
                  },
                  {
                    "group": "wg-mxwfs-users",
                    "description": "People+allowed+to+retrieve+calibration+certificates+from+WFS"
                  },
                  {
                    "group": "wg-ntsystems-allusers-rd",
                    "description": "An+NT+Systems+group+created+for+allowing+all+users+at+Sandia+the+ability+to+read+where +applied."
                  },
                  {
                    "group": "wg-nw-significant-centers",
                    "description": "NWSMU+Operations+created+to+provide+access +to+resources+on+the+NWMIS+website+and+to+relay+NW+info.++NW+Sig.+Centers+Criteria%3A++Costs+%3E+25%25 +of+total+or+%3E+%245M+NW+FY05+YE+Cost."
                  },
                  {
                    "group": "wg-paaa-r",
                    "description": "Read+only+users+of+the +PAAA+database%2C+especially+for+the+web+page+server+-+%5C%5CWS01821W2%5CPAAA"
                  },
                  {
                    "group": "wg-pals-system",
                    "description": "PALS%2FTAIPM+Attachment+Access+Group"
                  },
                  {
                    "group": "wg-payroll-helpline",
                    "description": "Members +have+access+to+the+payroll+helpline+call+log+website+at+https%3A%2F%2Finfo.sandia.gov%2Fpayroll"
                  },
                  {
                    "group": "wg-printing-everyonewrite",
                    "description": "This+is+a+collaborative+file+drop+area+for+Print+Shop+customers +to+placing+unlimited+release+files+that+need+to+be+printed.+The+customer+will+have+write+only+privileges +and+will+not+be+able+to+see%2C+read%2C+copy%2C+or+delete+files+in+this+share."
                  },
                  {
                    "group": "wg-rup-reporting-viewers",
                    "description": "This+group+is+used+to+determine+who+has+access+to+view+reports+on+the+RUP+SharePoint +site."
                  },
                  {
                    "group": "wg-saic",
                    "description": "CSS-DL+SAIC+employees+onsite+at+SNL."
                  },
                  {
                    "group": "wg-saic-share",
                    "description": "ACL+group+for+all+staff+to+access+collaborative+space"
                  },
                  {
                    "group": "wg-sams-customers",
                    "description": "Use+for+access+to+software+installations"
                  },
                  {
                    "group": "wg-sgb",
                    "description": "Stockpile +Governance+Board+Metagroup+-+for+access+to+the+SGB+and+related+sites."
                  },
                  {
                    "group": "wg-smi-developers",
                    "description": "Development+team+for+the+SMI+program+Used+for+handling+server+permissions+with+webaccts"
                  },
                  {
                    "group": "wg-snl-contractors",
                    "description": "*+*+*+This+is+a+legacy+group.+Use+wg-us-contractors+in +stead%21+*+*+*+SRN+Users+that+are+listed+as+contractors+and+US+citizens+in+NWIS."
                  },
                  {
                    "group": "wg-snl-it-community",
                    "description": "Member+of+this+group+are+part+of+Sandia%27s+Information+Technology+community"
                  },
                  {
                    "group": "wg-snl-user",
                    "description": "SRN+users+that+are+Sandia+employees+or+contractors+and+are+listed+as+US +citizens."
                  },
                  {
                    "group": "wg-spf-reports",
                    "description": "Users+who+can+access+the+SPF+Interface+reports +page"
                  },
                  {
                    "group": "wg-srn-uscitizens",
                    "description": "*+*+*+This+is+a+legacy+group.+Please+use+wg-us-employees +and+wg-us-contractors+instead.+*+*+*+%28Sandia+SRN+account+holders+%28DCE+or+NT%29+that+are+US+Citizens +according+to+the+NWIS+Database.++This+group+does+NOT+include+visitors."
                  },
                  {
                    "group": "wg-stem-regist-admins",
                    "description": "Administrators+of+the+STEM+Community+Programs+Registration+Site"
                  },
                  {
                    "group": "wg-storage-assessments-ec",
                    "description": "metagroup+controlling+access+to+SharePoint+ECTs+for+storage+assessments+application"
                  },
                  {
                    "group": "wg-stream-share-space",
                    "description": "Streaming+collabrative+share+access+group"
                  },
                  {
                    "group": "wg-suitusers",
                    "description": "This+list+is+used+to+keep+track+of+people+who+have+requested+the+SUIT +template+for+a+website.++When+the+new+Pattern+Library+templates+are+available%2C+we+should+send+a+list +to+all+of+these+people+to+notify+them+that+a+new+option+is+av"
                  },
                  {
                    "group": "wg-systemecs",
                    "description": "This+group+is+for+the+Systems+Engineering+Case+Studies.++The+project+is+sponsored+by+Departments+2916 %2C+2122+and+2130."
                  },
                  {
                    "group": "wg-td-office-license",
                    "description": "Users+in+this+list+are+assigned+an +office+license+UNLESS+they+are+in+the+No+Office+exclusion+list."
                  },
                  {
                    "group": "wg-techweb-basic-dev",
                    "description": "Techweb+Basic+developers"
                  },
                  {
                    "group": "wg-us-contractors",
                    "description": "Sandia+contractors+%28PO+Contractors %2C+Staff+Augmentation%29+with+SRN+accounts+that+are+listed+as+US+citizens.+This+group+includes+entity +accounts."
                  },
                  {
                    "group": "wg-us-pocontractors",
                    "description": "All+SRN+accounts+listed+as+PO+Contractors +and+US+citizens"
                  },
                  {
                    "group": "wg-vpn-test",
                    "description": "Group+for+general+VPN+testing."
                  },
                  {
                    "group": "wg-wctool-users",
                    "description": "Users+allowed+access+to+WC+Tool"
                  },
                  {
                    "group": "wg-webco",
                    "description": "Departments+08944 +and+09539+personnel"
                  },
                  {
                    "group": "wg-webdesigndev-community",
                    "description": "For+all+members+of+the+workforce +related+to+internal+and+external+web+design+and+development."
                  },
                  {
                    "group": "wg-xdamp",
                    "description": "Distribution +for+site+licensed+xdamp+version+with+embedded+IDL+license.++Sandians+and+contractors+only."
                  },
                  {
                    "group": "wg-xyce-website-admin",
                    "description": "Members+of+this+group+have+access+to+https%3A%2F%2Fshare.sandia .gov%2Fxyce%2Fadmin%2F"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  )
  .value('Error code', {});
