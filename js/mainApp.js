var myApp = angular.module('myApp', ['dataGrid', 'pagination','ngRoute','ngMaterial','createMenu','bugTagList']);

myApp.controller('issueController', ['$scope', 'issueFactory', function ($scope, issueFactory) {
	debugger;
    $scope.gridOptions = {
        data: [],
        urlSync: false
    };
    issueFactory.getData().then(function (responseData) {
        $scope.gridOptions.data = responseData.data;
    })

    $scope.newDate = function(newDate){

			var dateObj = new Date(newDate);
			var month = dateObj.getUTCMonth() + 1;
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			newdate = day  + "/" + month + "/" + year;

    		return (newdate);
    }

}]);

myApp.factory('issueFactory', function ($http) {
    return {
        getData: function () {
            return $http({
                method: 'GET',
                url: 'js/issuedata.json'
            });
        }
    }
});




myApp.controller('newissueController', ['$scope', function ($scope) {


}]);


myApp.config(function($routeProvider) {

	$routeProvider
	.when("/", {
	    templateUrl : "view/issues.html",
	    controller:"issueController"
	})
	.when("/issue", {
	    templateUrl : "view/issues.html",
	    controller:"issueController"
	})
	.when("/issue/new", {
	    templateUrl : "view/newissue.html",
	    controller:"newissueController"
	})
	.when("/issue/lables", {
	    templateUrl : "view/labels.html"
	})
    .when("/code", {
        templateUrl : "view/code.html",
    });
});



