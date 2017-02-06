/*
	This scripts represents logics to "Categories" interface.
*/
/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", "$error", function ($scope, $http, $firebaseArray, $userData, Notification, $error) {
		
		/*
			Scope variables.
		*/
		$scope.searchValue = "";
		
		/*
			Functions for template purposes.
		*/
		//Loads data from firebase. Is immediately invoked.
		($scope.LoadCategories = function () {
			($scope.categories = $firebaseArray($userData().child("categories")))
			.$loaded().catch($error);
		}());
		
		//After loading catgeories we must add some new fields to each one to use in template.
		//Note that the $watch method is angularfire method and called only when data is updated from the server.
		$scope.categories.$watch(function () {
			//Add an additional data to categories.
			$scope.categories.forEach(function (value, index, array) {
				//Used to add padding in category rendering.
				value.level = ParentCount($scope.categories, value);
			});
		});
		
		/*
			Helper functions.
		*/
		//Returns the count of parents of given item.
		function ParentCount(list, item) {
			//Using here "==" operator instead of "===" because $id can be either string or number.
			if (item.$id == item.parent)
				return 0;
			//Get the parent of given item.
			var parent = GetItem(list, item.parent);
			//If parent exists look for its parent.
			return parent ? 1 + ParentCount(list, parent) : 0;
		}
		
		//Returns the item from list according to its id(can be string or number).
		function GetItem(list, id) {
			if (id === undefined)
				return undefined;
			//Find out an item with given id in list.
			for (var i = 0; i < list.length; i++) {
				//Using here "==" operator instead of "===" because id and $id can be either string or number.
				if (list[i].$id == id)
					return list[i];
			}
			return undefined;
		}
	}]);
}());
