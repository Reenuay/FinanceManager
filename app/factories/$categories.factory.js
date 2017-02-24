/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.factory('$categories', function ($firebaseArray, $userData, $error) {
		//Main object containing extended $firebaseArray.
		var categories;
		Load();//Preload categories.
		categories.Load = Load;
		
		//Adds new category to database.
		categories.Add = function (category) {
			if (!category)
				return;
			
			//Check for uniqueness.
			for (var i = 0; i < categories.length; i++) {
				if (category.name.toLowerCase() === categories[i].name.toLowerCase()) {
					$error({message: "There is already such a category."});
					return;
				}
			}
			
			return this.$add(category)
			.catch($error);
		};
		
		//Updates category.
		categories.Update = function ($id, params) {
			if (!$id || !params)
				return;
			
			//Check for uniqueness.
			for (var i = 0; i < categories.length; i++) {
				if (categories[i].$id !== $id && params.name.toLowerCase() === categories[i].name.toLowerCase()) {
					$error({message: "There is already such a category."});
					return;
				}
			}
			
			//make necessary changes.
			var r = categories.$getRecord($id);
			r.name = params.name;
			r.color = params.color;
			r.icon = params.icon;
			delete r.Expand;
			delete r.Collapse;
			delete r.level;
			delete r.childrenCount;
			
			return this.$save(r)
			.catch($error);
		};
		
		categories.ExpandAll = function () {
			categories.forEach(function (element, index, array) {
				element.Expand();
			});
		};
		
		categories.CollapseAll = function () {
			categories.forEach(function (element, index, array) {
				element.Collapse();
			});
		};
		
		categories.$watch(function () {
			//Extend fields.
			categories.forEach(function (element, index, array) {
				//Used to add padding in category rendering.
				element.level = ParentCount(array, element);
				//Used to hide plus signs.
				element.childrenCount = ChildrenCount(array, element.$id);
				//Functions for expanding and collapsing item.
				element.Expand = function () {
					this.open = true;
				};
				element.Collapse = function () {
					delete this.open;
				};
			});
		});
		
		/*
			Helper functions.
		*/
		//Function for loading and reloading categories.
		function Load() {
			(categories = $firebaseArray($userData.child("categories")))
			.$loaded()
			.then(function () {
				categories.loaded = true;//ok
			})
			.catch(function (error) {
				$error(error);
				categories.loaded = false;//error
			});
			//if categories.loaded is not initialized there is loading.
		}
		
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
   	return categories;
 	});
}());
