myApp.controller('SurveysController',
  function($scope, $http,config,$route,$location) {

    console.log("inside survey controller");
      $scope.format = 'dd.MM.yyyy';
      $scope.date = new Date();

      $scope.$on('$viewContentLoaded', function() {
          console.log("survey main content loaded, initializing datatables");
          setTimeout(function() {$("#surveys-table").dataTable();},3000);

      });

    var req = {
      method: 'GET',
      url: config.baseUrl+ 'api/admin/group/survey',
      headers: {
        'Authorization': "123456"
      },
      data: { test: 'test' }
    }

    $http(req).
        success(function(data, status, headers, config) {
         console.log("LOADED ALL SURVEYS");
          //console.log(data);
          console.log(data);
          $scope.surveys=data;
        }).
        error(function(data, status, headers, config) {
          console.log("ERROR");

        });

  $scope.addSurvey = function() {
    surveys.$push({
      name: $scope.meetingname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.meetingname='';
    });
  }; //addsurvey

      $scope.deleteSurvey=function(surveyId) {
          console.log("deletingh survey "+surveyId);
          var req = {
              method: 'DELETE',
              url: config.baseUrl+'api/admin/survey/'+surveyId,
              headers: {
                  'Authorization': "123456"
              }

          }

          $http(req).
              success(function(data, status, headers, config) {
                  console.log("SUCCESS delete");
                  console.log(data);

                  $route.reload();

              }).
              error(function(data, status, headers, config) {
                  alert("ERROR WHILE DELETING");
                  console.log("ERROR  get answertrend");

              });

      }

      $scope.publishSurvey=function(surveyId) {
          console.log("publishing survey "+surveyId);
          var req = {
              method: 'POST',
              url: config.baseUrl+'api/admin/survey/'+surveyId+'/publish/',
              headers: {
                  'Authorization': "123456"
              }

          }

         $http(req).
              success(function(data, status, headers, config) {
                  console.log("SUCCESS publish");
                  console.log(data);

                 $route.reload();

              }).
              error(function(data, status, headers, config) {
                  console.log("ERROR  get answertrend");
                 alert("ERROR WHILE PUBLISHING TREND");

              });

      }


}); //SurveysController

myApp.controller("TrendController",function($route,$routeParams,$http,$scope,config){
    console.log("trend");
   console.log($routeParams);

    $scope.config = {
        title: 'We put the label we want',
        tooltips: true,
        labels: false,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
            display: true,
            //could be 'left, right'
            position: 'right'
        }
    };

    $scope.data = {
        series: [],
        data: []
    };
    console.log("prima");
    console.log($scope.data);
    $scope.label=[];
    $scope.label[0]="very satisfied";
    $scope.label[1]="satisfied";
    $scope.label[2]="neutral";
    $scope.label[3]="dissatisfied";
    $scope.label[4]="very dissatisfied";

    var req = {
        method: 'GET',
        url: config.baseUrl+'api/admin/surveyscore/'+$routeParams.id+'/answerstrend',
        headers: {
            'Authorization': "123456"
        },
        data: { test: 'test' }
    }
    $scope.chartData=[];
  $http(req).
        success(function(data, status, headers, config) {
            console.log("SUCCESS get answertrend");
            console.log(data);

            $scope.trend=data.MoodTotal;
            console.log($scope.trend);
            console.log("calling chart controller");
            for (var i = 0; i < $scope.trend.length; i ++) {
              $scope.data.data.push({x:$scope.label[i],
                y:[$scope.trend[i]]
              });

            }
          console.log("dopo");
          console.log($scope.data);

        }).
        error(function(data, status, headers, config) {
            console.log("ERROR  get answertrend");

        });

});

myApp.controller("AddSurveyController",function($route,$routeParams,$http,$scope,$location,config){
    console.log("add survey controller ");
    console.log($routeParams);

    $scope.newQuestion="";
    $scope.surveyModel=new Object();
    $scope.surveyModel.questions=[];
    $scope.questID=0;

    /* survey model elements */

    $scope.surveyModel.Id=0;
    //$scope.surveyModel.Name="test";
    //$scope.surveyModel.Description="Testing the POST for a survey";

    $scope.surveyModel.OwnerId=0;
    $scope.surveyModel.Status=0;
    $scope.surveyModel.ImportanceValue=0;
    $scope.surveyModel.RecurrenceType=0;
    $scope.surveyModel.RecurrenceLength=0;
    $scope.surveyModel.ExpiryDate="";

    $scope.surveyModel.Groups=[];
    $scope.surveyModel.Recur=false;




    // Model to JSON for demo purpose
    $scope.$watch('surveyModel.questions', function(questions) {
        console.log("surveyModel.questions changed");
    }, true);

    $scope.addSurvey = function() {
        console.log("la marianna la va in campagna");
    }

    $scope.addItem=function() {

        $scope.surveyModel.questions.push(
            {
                QuestionText:$scope.newQuestion,
                Id:0,
                Pos:$scope.questID,
                //Id:$scope.questID,
                SurveyId:0
            }
        );
        $scope.questID++;
       // $scope.gino.push({"question":$scope.newQuestion});

        console.log("add item"+$scope.surveyModel.questions.length);

    $scope.newQuestion="";
    }

    $scope.addSurvey = function() {
        console.log("insertingh a new survey");

        var req = {
         method: 'POST',
         url: config.baseUrl+'api/admin/survey',
         headers: {
         'Authorization': "123456"
         },
         data: $scope.surveyModel
         }

         $http(req).
         success(function(data, status, headers, config) {
         console.log("SUCCESS get answertrend");
         console.log(data);

         $scope.trend=data.MoodTotal;
                 $location.path('/surveys');
         }).
         error(function(data, status, headers, config) {
         console.log("ERROR  get answertrend");
                 console.log(data);
                 console.log(status);
                 console.log(headers);
                 console.log(config);
         });


    }

    $scope.slideUp=function(theVar) {
        console.log("slide up:"+theVar);
        var pos=0;
        for(i=0;i<$scope.surveyModel.questions.length;i++) {
            if($scope.surveyModel.questions[i].Pos==theVar) {
                pos=i;
                console.log("item found at position "+pos);
                break;
            }
        }
        if(pos>0) {
            $scope.surveyModel.questions.move(pos,pos-1);
        }

    }

    $scope.slideDown=function(theVar) {
        console.log("slide down:");
        var pos=0;
        for(i=0;i<$scope.surveyModel.questions.length;i++) {
            if($scope.surveyModel.questions[i].Pos==theVar) {
                pos=i;
                console.log("item found at position "+pos);
                break;
            }
        }
        if(pos<($scope.surveyModel.questions.length-1)) {
            $scope.surveyModel.questions.move(pos,pos+1);
        }
    }


})

/*
 {
 "Id":0,
 "Name":"Testing 123",
 "Description":"Testing the POST for a survey",
 "OwnerId":0,
 "Status":0,
 "ImportanceValue":0,
 "RecurrenceType":0,
 "RecurrenceLength":0,
 "ExpiryDate":"",
 "Questions":[
 {
 "Id":0,
 "QuestionText":"Q1",
 "SurveyId":0
 },
 {
 "Id":0,
 "QuestionText":"Q2",
 "SurveyId":0
 }
 ],
 "Groups":[

 ],
 "Recur":false
 }

*/


Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 &&
        0 <= pos1 && pos1 <= this.length &&
        0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}