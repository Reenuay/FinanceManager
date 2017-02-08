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
		$scope.search = {};
		$scope.search.value = "";
		$scope.search.viewMode = "$id";
		$scope.search.order = "";
		
		/*
			Functions for template purposes.
		*/
		//Loads data from firebase. Is immediately invoked.
		($scope.LoadCategories = function () {
			($scope.categories = $firebaseArray($userData().child("categories")))
			.$loaded()
			.then(function () {
				$scope.categories.loaded = true;
			})
			.catch(function (error) {
				Notification.error(error.message);
				$scope.categories.loaded = false;
			});
		}());
		
		//Extends catgeories fields to further use in template.
		$scope.ExtendFields = function (list) {
			//Add an additional data to categories.
			list.forEach(function (value, index, array) {
				//Used to add padding in category rendering.
				value.level = ParentCount(list, value);
			});
			return list;
		};
		
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
