(function () {
    'use strict';

angular.module('createMenu',[])
      .component('headerMenu',{

         templateUrl:'/Bug-Tracker-master_php/js/components/tab.components/tab.template.html',

         controller:function($scope,$location,$http){
          
            var that = this;

            that.LogoName = "Do";

            that.menudata = {
                 data: [],
                 urlSync: false
             };

            that.getData = function(){
               return $http({
                   method: 'GET',
                   url: '/Bug-Tracker-master_php/js/json/menudata.json'
               });
            }

             that.getData().then(function (responseData) {
                  that.menudata.data = responseData.data;

                  that.activeTab = that.menudata.data[1];
                  that.activeTab.selected = true;
                  that.currentLocation = "/" + that.activeTab.menu_code;
                  that.text = that.activeTab.menu_name;
             });

            that.select = function(menu){
               angular.forEach(that.menudata.data, function(menu) {
                  menu.selected = false;
               });
               menu.selected = true;
               that.currentLocation = "/" + menu.menu_code;
               that.text = menu.menu_name;
            }

         },

});

})();