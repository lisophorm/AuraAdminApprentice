myApp.controller("navigationCtrl", function ($scope) {
    console.log("inside navigation controller");

    // once the navigation is loaded we can initialize the accordion function

    $scope.$on('$includeContentLoaded', function(){
        console.log("navigation completely loaded");
        console.log(arguments);

        $('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'slow',
            showCount: false,
            autoExpand: true,
//        cookie: 'dcjq-accordion-1',
            classExpand: 'dcjq-current-parent'
        });

    });

});