myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', function ($http,config,$rootScope,$q) {
    console.log("UPLOAD SERVICE");
    var defer = $q.defer();
    console.log(config.baseUrl);
    this.uploadFileToUrl = function(file, uploadUrl){
        console.log("uploadFileToUrl");
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Authorization': "123456",
                'Content-Type': undefined
            }
        })
            .then(function(result) {
           console.log("chain success"+config.baseUrl);
                console.log(result);
                console.log(result.data[0].StoredFileName);

                var req = {
                    method: 'POST',
                    url: config.baseUrl+ 'api/admin/user/import',
                    headers: {
                        'Authorization': "123456"
                    },
                    data: {   "ContainsHeaders": true,
                        "OverwriteExistingUsers": true,
                        "FieldEnclosure": "A",
                        "FieldSeparator": "A",
                        "FileName": result.data[0].StoredFileName
                    }
                };

                return $http(req).
                    success(function(data, status, headers, config) {
                        console.log("SUCCESS EMAIL IMPORT");

                        //var msg=result.UsersAdded.lenght.toString();
                        //alert("users added "++" - "+result.UsersNotAdded.lenght+" users not added")


                    }).
                    error(function(data, status, headers, config) {
                        $rootScope.$emit("uploadErrorEvent", data);
                        console.log("ERROR");
                        console.log(data);

                    });


        }, function(error) {
                $rootScope.$emit("importErrorEvent", error);
                console.log("chain error");
                console.log(error);
                alert(error.data.Message);
        }, function(update) {
                console.log("chain update");
                console.log(update);
        }).then(function(secondCallResult){
                defer.resolve();
                console.log("import emails");
                console.log(secondCallResult);
                $rootScope.$emit("importCompleteEvent", secondCallResult.data);
            });
        /* $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Authorization': "123456",
                'Content-Type': undefined
            }
        }).
            success(function(data, status, headers, config) {
                console.log("SUCCESS UPLOAD");
                console.log(data);

            }).
            error(function(data, status, headers, config) {
                console.log("ERROR UPLOAD");

                var msg=angular.fromJson(data);
                console.log(data);
                alert(msg.Message);

            });*/
    }
});

myApp.controller('fileUploadCTRL',  function($scope,$rootScope, config,fileUpload){
    console.log("UPLOADCONTROLLER");
    $scope.valore="gino";

    $scope.readyToUpload=false;
    $scope.isUploading=false;

    $rootScope.$on('importCompleteEvent', function(event, data) {
        $scope.isUploading=false;
        console.log("********************************* la marianna la va in campagna");
        $scope.emailsImported= data.UsersAdded.length;
        $scope.emailsNotImported= data.UsersNotAdded.length;
    });

    $rootScope.$on('importCompleteEvent', function(event, data) {
        $scope.isUploading=false;
        console.log("********************************* la marianna la va in campagna");
        $scope.emailsImported= data.UsersAdded.length;
        $scope.emailsNotImported= data.UsersNotAdded.length;
    });

    $rootScope.$on('importCompleteEvent', function(event, data) {
        $scope.isUploading=false;

        console.log("********************************* la marianna la va in campagna");
        $scope.emailsImported= data.UsersAdded.length;
        $scope.emailsNotImported= data.UsersNotAdded.length;
    });

    $scope.$watch('myFile', function() {
        if($scope.myFile.type=="text/csv") {
            $scope.readyToUpload=true;
        } else {
            alert("The only format allowed is CSV");
            $scope.readyToUpload=false;
        }
    });

    console.log(config.baseUrl);
    $scope.uploadFile = function(){
        $scope.readyToUpload=false;
        $scope.isUploading=true;
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = config.baseUrl+"api/admin/upload";
        console.log(uploadUrl);
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

});

