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
		//This object conatins view and sorting fields and methods.
		$scope.search = {};
		$scope.search.value = "";
		//'$id' for true and '' for false. Used for many logics in template.
		//For example, for hiding plus and minus signs, parent-child ordering and so on.
		$scope.search.viewMode = "$id";
		//can be '-name', '', '+name'. Used for name ordering.
		$scope.search.order = "";
		//Functions for expanding and collapsing one or more item.
		$scope.search.ItemExpand = function (item) {
			item.open = true;
		};
		$scope.search.ItemCollapse = function (item) {
			delete item.open;
		};
		$scope.search.ItemExpandAll = function () {
			$scope.categories.forEach(function (element, index, array) {
				element.open = true;
			});
		};
		$scope.search.ItemCollapseAll = function () {
			$scope.categories.forEach(function (element, index, array) {
				delete element.open;
			});
		};
		//This object contains actions for categories.
		$scope.actions = {};
		$scope.actions.name = "";
		$scope.actions.icon = "fa fa-asterisk";
		$scope.actions.color = "black";
		//Selects a category.
		$scope.actions.Select = function (item) {
			if ($scope.search.selected !== item)
				$scope.search.selected = item;
			else
				delete $scope.search.selected;
		};
		
		/*
			Functions for template purposes.
		*/
		//Loads data from firebase. Is immediately invoked.
		($scope.LoadCategories = function () {
			($scope.categories = $firebaseArray($userData().child("categories")))
			.$loaded()
			.then(function () {
				//Mark as loaded.
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
			list.forEach(function (element, index, array) {
				//Used to add padding in category rendering.
				element.level = ParentCount(list, element);
				//Used to hide plus signs.
				element.childrenCount = ChildrenCount(array, element.$id);
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
		
		//Returns the count of children of object with current id.
		function ChildrenCount(list, id) {
			var res = 0;
			for (var i = 0; i < list.length; i++) {
				//Count childrens.
				res += list[i].parent == id;
			}
			return res;
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
