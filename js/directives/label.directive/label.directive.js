(function () {
    'use strict';
    angular.module('bugTagList', ['pagination','dataGrid']) // Module Creation
    .directive('tagList', function () { //Directive Creation
        return {
            require: 'grid',
            restrict: 'EA', //Ways of using directives E=can be use as a elemnt,A=can be use as arribute.
            scope: {  //Creating isolated scope.
                message: '@'
            },
            templateUrl: '/Bug-Tracker-master_php/js/directives/label.directive/label.template.html',//template Creation.
            controller: 'tagListCtrl as tagList'//Controller name declearation.
        }
    })
    .controller('tagListCtrl', ['$scope', '$element', '$http', function ($scope, $element, $http) {

        $scope.message = 'Controller is binded.';
        $scope.labeldata = {
            data: [],
            urlSync: false
        };

        $scope.getData = function () {
            return $http({
                method: 'GET',
                url: '/Bug-Tracker-master_php/js/labledata.json'
            });
        };

        $scope.getData().then(function (responseData) {
            $scope.labeldata.data = responseData.data;
        });

        $scope.edit = function (id) {
            $('[data-action="edit-' + id + '"]').addClass('hide');
            $('[data-action="save-' + id + '"]').removeClass('hide');
            $('#edit-form-' + id).removeClass('hide');
            $('#tag-data-' + id).addClass('hide');
        };
        $scope.save = function (id) {
            $('[data-action="edit-' + id + '"]').removeClass('hide');
            $('[data-action="save-' + id + '"]').addClass('hide');
            $('#edit-form-' + id).addClass('hide');
            $('#tag-data-' + id).removeClass('hide');
            $('#tag-data-' + id).find('span').text($('#edit-form-' + id).find('input[type=text]').val());
            $('#tag-data-' + id).css('background-color', $('#edit-form-' + id).find('input[type=color]').val());
        };
        $scope.delete = function (id) {
            $('#tag-alert-modal').modal('open');
            $scope.LabelName = $('#tag-data-' + id).find('span').text();
            $scope.LableId = id;
        };
        $scope.doDelete = function (id, Name) {
            $('#tag-panel-' + id).remove();
            Materialize.toast(Name + ' is deleted sucessfully.', 4000);
        };
        $scope.sortAsc = function(){
            $scope.sortOptions = {
                predicate: 'tag',
                direction: 'asc'
            }
        }
    }]);
})();