var intro = angular.module("intro", ["ngAnimate", "ui.router"]);
intro.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index',
        {
            url: "/:slideNumber",
            templateUrl: "partials/slide.html",
            controller: "PresoCtrl as preso"
        });

    $urlRouterProvider.when("", "/0");
});
intro.value("slides",
    [
        {
            header: "http://j.mp/ng-thor",
            points: [
                "lesson files"
            ]
        },
        {
            header: "Schedule:",
            points: [
                "Lunch: 12:00 -> 1:00",
                "15 minute breaks every 1.5 hours",
                "End: ~4:30pm"
            ]
        },
        {
            header: "Plan",
            points: [
                "Teach as much as possible"
            ]
        },
        {
            header: "AngularJS is...",
            points: [
                "Rapidly evolving",
                "Often misunderstood",
                "Surrounded by other projects",
                "Open to varying opinions"
            ]
        },
        {
            header: "AngularJS comprises...",
            points: [
                "Binding",
                "MVC",
                "Helpers (routing, animation, $http)",
                "Custom HTML (directives)",
                "Built-in behavior, but not components"
            ]
        },
        {
            header: "The internet is full of...",
            points: [
                "Bad examples",
                "Good examples",
                "Outdated good examples",
                "Oversimplifications"
            ]
        }
    ]
);

intro.controller("AppCtrl", function ($state, $stateParams, $rootScope) {
    this.changeSlide = function ($event) {
        var slideNumber = $stateParams.slideNumber;

        if ($event.keyCode == "37") {
            slideNumber--;
        }
        else if($event.keyCode == "39"){
            slideNumber++;
        }
        $state.go("index", {slideNumber:slideNumber})
    }
});

intro.controller("PresoCtrl", function (slides, $stateParams) {
    this.slides = slides;

    this.slideNumber = $stateParams.slideNumber;
    console.log(this.slideNumber)
});

intro.animation(".cross", function () {
    return {
        addClass: function (element, className, done) {
            TweenMax.from(element,.5, {opacity: 0, onComplete:done});
        }
    }
});

//I'm only doing this because ui-view doesn't currently work with 1.2 animation
intro.directive("slide", function ($animate, $stateParams) {
    return function (scope, element) {
        $animate.addClass(element, "cross")
    }
});
