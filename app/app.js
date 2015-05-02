var myApp = angular.module('myApp', ['ngRoute', 'appControllers','datatables','angularCharts']);

myApp.constant('config', {
    baseUrl: 'https://api.auratrend.co.uk/'
    //'https://ec2-52-17-125-135.eu-west-1.compute.amazonaws.com/api/admin/survey/'
    //  http://auratrend.co.uk/
});

var appControllers = angular.module('appControllers',
    []);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'partials/login.html',
            controller:  'RegistrationController'
        }).
        when('/404', {
            templateUrl: 'partials/404.html',
            controller:  'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'partials/register.html',
            controller:  'RegistrationController'
        }).
        when('/surveys', {
            templateUrl: 'partials/surveys.html',
            controller: 'SurveysController'
        }).
        when('/addsurvey', {
            templateUrl: 'partials/addSurvey.html',
            controller: 'AddSurveyController'
        }).
        when('/uploadcontacts', {
            templateUrl: 'partials/uploadEmails.html',
            controller: 'fileUploadCTRL'
        }).
        when('/trend/:id', {
            templateUrl: 'partials/trend.html',
            controller: 'TrendController'
        }).
        otherwise({
            redirectTo: '/404'
        });
}]);

myApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])