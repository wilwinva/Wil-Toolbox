'use strict';
/**
 * @ngdoc directive
 * @name corpDictApp.directive:snlSearchFilter
 * @description
 * # snlSearchFilter
 *
 * actionurl assigns service to form in directive.
 * actionurl="apis/term-by-date.php"
 *
 * report variable will change form accordingly and can take arguments
 * changereport, termsbydate, and termbyid.
 *
 * The variables below are initiated as object variables and are located
 * under /report/createReportCtrl.js in order for this directive and results
 * form to inherit them.
 * example:
 * recordquery="ctrl.recordquery"
 * queryresults="ctrl.queryresults"
 *
 *
 *
 */
angular.module('corpDictApp')
    .directive('snlSearchFilter', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                report: '@',
                actionurl: '@actionurl',
                recordquery: '=',
                queryresults: '='
            },
            templateUrl: 'app/components/report/searchFilters/searchFilter.tpl.html',
            controller: 'searchFilterCtrl as ctrl',
            link: function ( scope, element, attrs, ngModelCtrl) {
                var updateModel = function (dateText) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(dateText);
                    });
                };
                var options = {
                    dateFormat: "yymmdd",
                    onSelect: function (dateText) {
                        updateModel(dateText);
                    }
                };
                // Initializes directives in template.
                $compile(element.contents())(scope);
            }
        };
    })
    .directive('snlDatepicker', function ($compile) {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {
                var updateModel = function (dateText) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(dateText);
                    });
                };
                var options = {
                    dateFormat: "yymmdd",
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (dateText) {
                        updateModel(dateText);
                    }
                };
                angular.element(document).ready(function () {
                    $(elem).datepicker(options);
                });
            }
        }
    })
    .directive('snlLoader', function () {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/report/searchFilters/loader.tpl.html'
        }
    })
    .controller('searchFilterCtrl',['$scope','$http','dictionaryModel','ENV','$httpParamSerializerJQLike',
        function ($scope, $http, dictionaryModel, ENV, $httpParamSerializerJQLike) {
            var self = this;

            $scope.changereport = $scope.report == 'changereport' ? true : false;
            $scope.termbyid = $scope.report == 'termbyid' ? true : false;
            $scope.termsbydate = $scope.report == 'termsbydate' ? true : false;
            $scope.isHistoryReport = $scope.report == 'termbyid' ? true : false;

            $scope.changeAmp = function (input) {
                var out = '';
                out = input.replace('&', '&amp;');
                return out;
            };

            //Populate dropdowns
            dictionaryModel.fetch(ENV.categoryUrl).then(function (data) {
                self.categoryOptions = data;
            });

            var dummyData = [
                {
                    "term_id": "1712",
                    "term_name": "Chemical Information System (CIS)",
                    "definition": "SNL system composed of an extensive safety data sheet (SDS) library and an integrated chemical inventory system, which tracks chemical containers by SNL CIS barcodes.<\/p>", "update_reason": "Changed references to \"Material Safety Data Sheet\" to \"Safety Data Sheet.\" This change is consistent with Corporate Policy System documents and federal requirements.",
                    "last_updated_date": "Nov 10 2015 04:13:07:007PM",
                    "last_updated_by": "JGILLIG",
                    "category_list": "ES&H"
                },
                {
                    "term_id": "1751",
                    "term_name": "Commercial Motor Vehicle (CMV)",
                    "definition": "Any self-propelled or towed motor vehicle used on highways in interstate commerce to transport passengers or property when the vehicle (a) has a gross vehicle weight rating (GVWR), gross combination weight rating (GCWR), gross vehicle weight (GVW), or gross combination weight (GCW) of 4,536 kg (10,001 pounds) or more, whichever is greater; or (b) is designed or used to transport more than 8 passengers, including the driver, for compensation; or (c) is designed or used to transport more than 15 passengers, including the driver, and is not used to transport passengers for compensation; or (d) is used in transporting material found by the Secretary of Transportation to be hazardous under 49 USC 5103 and transported in a quantity requiring placarding under regulations prescribed by the DOT Secretary under 49 CFR, Subtitle B, Chapter I, Subchapter C (49 CFR 390.5).<\/li> A motor vehicle or combination of motor vehicles used in commerce to transport passengers or property if the motor vehicle (a) has a GCWR of 11,794 kg (26,001 pounds) or more inclusive of a towed unit with a GVWR of more than 4,536 kilograms (10,000 pounds); or (b) has a GVWR of 11,794 kg (26,001 pounds) or more; or (c) is designed to transport 16 or more passengers, including the driver; or (d) is of any size and is used in the transportation of material found to be hazardous for the purposes of the Hazardous Materials Transportation Act (49 USC, Appendix 1801-1813) and which requires the motor vehicle to be placarded under the hazardous materials regulations (49 CFR 382.107 and 383.5).<\/li> <\/ol>Note:<\/strong> The Federal Motor Carrier Safety Regulations (FMCSR) begin with a GVWR of 10,001 pounds or more (see 1a above). However, this threshold is changed to 26,001 pounds or more for both controlled substances\/alcohol standards and commercial driver's license (CDL) standards. It may be useful to classify the differences into two groups: vehicle-related and alcohol-related.<\/p>Examples of CMVs include:<\/p>1-ton stake vehicle<\/li>Large panel truck<\/li>Trash compactor and dumpster<\/li>Dump truck<\/li>Semi-truck<\/li>Semi-trailer (B-numbered trailer, mobile office, or lab trailer)<\/li>16-passenger van (SNL\/NM)<\/li>10-passenger van (SNL\/CA)<\/li>Any vehicle carrying hazardous material that requires a placard<\/li> <\/ul>",
                    "update_reason": "Removed extra space at the beginning of the definition.",
                    "last_updated_date": "Oct 23 2015 10:20:29:413AM",
                    "last_updated_by": "JKEVANS",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "2182",
                    "term_name": "Hot Work",
                    "definition": "Any temporary or permanent operation involving open flames or producing heat and\/or sparks. Hot work includes, but is not limited to, brazing, cutting, soldering, grinding, torch-applied roofing or welding.<\/p>", "update_reason": "Corrected definition font.",
                    "last_updated_date": "Oct 23 2015 02:18:18:213PM",
                    "last_updated_by": "JKEVANS",
                    "category_list": ",ES&H,ES&H,Facilities"
                },
                {
                    "term_id": "2796",
                    "term_name": "Safety Class Structures, Systems and Components",
                    "definition": "Structures, systems, or components (SSCs), including portions of process systems, whose preventi",
                    "update_reason": "Changed \"storm water\" to \"stormwater.\"",
                    "last_updated_date": "Oct 23 2015 01:35:38:330PM",
                    "last_updated_by": "JGILLIG",
                    "category_list": "ES&H"
                },
                {
                    "term_id": "2934",
                    "term_name": "Stormwater",
                    "definition": "Stormwater runoff, snowmelt runoff, and surface runoff and drainage.<\/p>",
                    "update_reason": "Updated definition and made \"stormwater\" one word in the term name.",
                    "last_updated_date": "Oct 27 2015 03:51:49:367PM",
                    "last_updated_by": "MERJONE",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "2935",
                    "term_name": "Stormwater Drainage System",
                    "definition": "A conveyance or system of conveyances (including roads with drainage systems, municipal streets, catch basins, curbs, gutters, ditches, manmade channels, or storm drains) designed or used for collecting or conveying stormwater.<\/p>", "update_reason": "Made \"stormwater\" one word in the term name. Updated the definition.",
                    "last_updated_date": "Oct 27 2015 03:56:15:060PM",
                    "last_updated_by": "MERJONE",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "3092",
                    "term_name": "Wastewater",
                    "definition": "(1) Used water that is to be discarded, such as sanitary sewer effluent from sources such as elimination of human waste, process waters, personal wash water from showers and sinks, or water from any washing operation (for example, washing vehicles, buildings, or equipment) or (2) stormwater that was captured in any secondary containment structure regardless of whether that container was designed to or deliberately placed to catch or contain the rain.<\/p>",
                    "update_reason": "Changed \"storm water\" to \"stormwater.\"",
                    "last_updated_date": "Oct 23 2015 01:35:59:413PM",
                    "last_updated_by": "JGILLIG",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "3756",
                    "term_name": "Land Disturbance",
                    "definition": "Changes to land surface caused by grading, soil or waste stockpiles, excavation, lay-down areas, equipment storage areas, vehicle access-ways, or maintenance areas.<\/p>",
                    "update_reason": "Added term to dictionary.",
                    "last_updated_date": "Oct 27 2015 10:58:56:340AM",
                    "last_updated_by": "MERJONE",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "3756",
                    "term_name": "Land Disturbance",
                    "definition": "Land disturbance includes both earth-disturbing activities and construction support activities. \"Earth-disturbing activities\" are actions taken to alter the existing vegetation and\/or underlying soil of a site, such as clearing, grading, site preparation (e.g., excavating, cutting, and filling), soil compaction, and movement and stockpiling of top soils. \"Construction support activities\" are construction-related activities that specifically support construction and involve earth disturbance or pollutant-generating activities, including activities in concrete or asphalt batch plants, equipment staging yards, materials storage areas, excavated material disposal areas, and borrow areas.<\/p>",
                    "update_reason": "Term updated to make it more comprehensive.",
                    "last_updated_date": "Dec 8 2015 08:40:49:757AM",
                    "last_updated_by": "JGILLIG",
                    "category_list": ",ES&H"
                },
                {
                    "term_id": "41617",
                    "term_name": "Workforce Acquisition Process",
                    "definition": "https:\/\/sharepoint.sandia.gov\/sites\/WAP\/default.aspx",
                    "update_reason": "Corporate acronym migration",
                    "last_updated_date": "Nov 5 2015 12:00:00:000AM",
                    "last_updated_by": "djsedil",
                    "category_list": "Human Resources"
                }
            ];

            self.numRecords = dummyData.length;
            console.log("numRecords:" + self.numRecords);

            $scope.submit = function () {
                //Reset results view.
                $scope.queryresults = dummyData;
                //$scope.queryresults = [];
                // $('.noresultsmsg').hide();
                // $('.loader').show();
                //
                // var req = {
                //     method: 'GET',
                //     url: $scope.actionurl,
                //     params: $scope.recordquery,
                //     paramSerializer: '$httpParamSerializerJQLike'
                // };
                //
                // $http( req ).then(
                //     function (res) {
                //         $('.loader').hide();
                //         $('.noresultsmsg').hide();
                //         if( res.data.length < 1){
                //             $('.noresultsmsg').show();
                //         }
                //         $scope.queryresults = res.data;
                //     },function () {
                //     $('.loader').hide();
                //     $('.noresultsmsg').show();
                //     }
                // );
            };

        }]);
