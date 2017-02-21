/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesAddController", ["$scope", "$stateParams", "$firebaseArray", "$userData", "Notification", "$error", function ($scope, $stateParams, $firebaseArray, $userData, Notification, $error) {
		
		/*
			Local variables.
		*/
		//Parameters.
		var parent_id = $stateParams.parent_id, categories;
		
		/*
			Scope variables.
		*/
		$scope.main = {};
		
		//Load parent category.
		(categories = $firebaseArray($userData().child("categories")))
		.$loaded()
		.then(function () {
			var record = categories.$getRecord(parent_id);
			if (record) {
				$scope.main.parent = true;
				$scope.main.parentName = record.name;
				$scope.main.parentIcon = record.icon;
				$scope.main.parentColor = record.color;
			}
		})
		.catch($error);
		
	}]);
}());
