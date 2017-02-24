/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesListController", ["$scope", "$categories", "$state",  function ($scope, $categories, $state) {
		
		//Main object.
		$scope.main = {};
		
		//Array of categories.
		$scope.categories = $categories;
		
		//Disabled state for edit/delete buttons.
		$scope.main.disabled = true;
		
		//Search value.
		$scope.main.searchValue = "";
		
		//'$id' for true and '' for false. Used for many logics in template.
		//For example, for hiding plus and minus signs, parent-child ordering and so on.
		$scope.main.viewMode = "$id";
		
		//can be '-name', '' or '+name'. Used for name ordering.
		$scope.main.listOrder = "";
		
		//Selects a category.
		$scope.main.Select = function (item) {
			if ($scope.main.selected !== item) {
				$scope.main.selected = item;
				$scope.main.disabled = false;
			}	else {
				delete $scope.main.selected;
				$scope.main.disabled = true;
			}
		};
		
		//Go to add/edit interface.
		$scope.main.GoToAdd_Edit = function (params) {
			$state.go("main.categories.add", params);
		};
	}]);
}());
