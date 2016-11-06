/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.factory('$userData', ["$firebaseAuth", function ($firebaseAuth) {
   return function() {
		 return firebase.database().ref().child("users").child($firebaseAuth().$getAuth().uid);
   };
 }]);
}());
