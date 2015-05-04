myApp.controller('RegistrationController', 
  function($scope, $location) {
  
  $scope.login = function() {
    $location.path('/surveys');
  }; //login

  $scope.register = function() {

  }; //login

}); //RegistrationController