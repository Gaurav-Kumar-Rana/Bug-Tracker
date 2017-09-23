angular.module('myApp', ['dataGrid', 'pagination', 'ngMaterial'])
    .controller('myAppController', ['$scope', 'myAppFactory', function ($scope, myAppFactory) {

        $scope.gridOptions = {
            data: [],
            urlSync: false
        };
        myAppFactory.getData().then(function (responseData) {
            $scope.gridOptions.data = responseData.data;
        })

    }])
    .factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: 'https://angular-data-grid.github.io/demo/data.json'
                });
            }
        }
    });

    

(function ($) {
	var methods = {
	init: function (options) {
	    var _ul='<ul class="tabs">';
	    var defaults = {
	        data:'',
	    };
	    options = $.extend(defaults, options);
	    return this.each(function (i) {
	      	var $this = $(this);
	  		$.each(options.data,function(j,value){
					_ul = _ul + '<li class="tab">' +
							'<a href="#'+ value.menu_name +'">';
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
			$('ul.tabs').tabs();
	  		$('ul.tabs').tabs('select_tab', 'Issue');
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

(function ($) {
	var methods = {
	init: function (options) {
	    var _ul='<ul class="tabs">';
	    var defaults = {
	        data:'',
	    };
	    options = $.extend(defaults, options);
	    return this.each(function (i) {
	      	var $this = $(this);
	  		$.each(options.data,function(j,value){
					_ul = _ul + '<li class="tab">' +
							'<a href="#'+ value.menu_name +'">';
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
			$('ul.tabs').tabs();
	  		$('ul.tabs').tabs('select_tab', 'Issue');
		});
	  },
	  update: function(){
	  },
	}
	$.fn.issueList = function (methodOrOptions) {
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