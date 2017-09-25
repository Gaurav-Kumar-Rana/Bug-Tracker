var myApp = angular.module('myApp', ['dataGrid', 'pagination','ngRoute','ngMaterial']);

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
debugger;
    return {
        getData: function () {
            return $http({
                method: 'GET',
                url: 'js/issuedata.json'
            });
        }
    }
});


myApp.controller('labelsController',['$scope','labelsFactory',function($scope,labelsFactory){
	$scope.lablesOptions = {
        data: [],
        urlSync: false
    };
    labelsFactory.getData().then(function (responseData) {
        $scope.lablesOptions.data = responseData.data;
    });
}]);


myApp.factory('labelsFactory', function ($http) {

    return {
        getData: function () {
            return $http({
                method: 'GET',
                url: 'js/labledata.json'
            });
        }
    }
});


myApp.controller('newissueController',['$scope',function($scope){

	
    
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
	    templateUrl : "view/labels.html",
	    controller:"labelsController"
	});
});

(function ($) {

	var methods = {
	init: function (options) {
	    var _ul='<ul class="tabs">';
	    var defaults = {
	        data:'',
	        activeTab:'',
	    };
	    options = $.extend(defaults, options);
	    return this.each(function (i) {
	      	var $this = $(this);
	  		$.each(options.data,function(j,value){
					_ul = _ul + '<li class="tab">' +
							'<a href="#'+ value.menu_code +'">';
						if(value.icon_name != ''){
							_ul = _ul +'<i class="material-icons">'+ value.icon_name +'</i>' ;
						}
							_ul = _ul + value.menu_name ;
						if(value.menu_count > 0 && value.menu_count!=""){
							_ul = _ul + '<span class="Counter">'+ value.menu_count +'</span>';
						}
						_ul = _ul + '</a>';
					_ul = _ul + '</li>';
	  		});
			_ul = _ul + '</ul';
			$this.append(_ul);

			$this.find('ul.tabs .tab').on('click',function(){
				$this.find('ul.tabs .tab a').removeClass('active')
				$(this).find('a').addClass('active');
			});

			$this.find('a[href="#'+ options.activeTab +'"]').addClass('active');

			//$('ul.tabs').tabs();
	  		//$('ul.tabs').tabs('select_tab', 'Issue');
		});
	  },
	  update: function(){
	  },
	}
	$.fn.loadMenu = function (methodOrOptions) {
		if (methods[methodOrOptions]) {
		  return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
		  // Default to "init"
		  return methods.init.apply(this, arguments);
		} else {
		  $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tabs');
		}
	};
})(jQuery);

