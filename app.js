/*global angular, firebase*/
(function () {
  "use strict";
	//Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDA88bCzk34u7ILqrj4fBljJs7WemmU3BA",
    authDomain: "financemanager-42340.firebaseapp.com",
    databaseURL: "https://financemanager-42340.firebaseio.com",
    storageBucket: "financemanager-42340.appspot.com",
    messagingSenderId: "172763067741"
  });
	
  var app = angular.module("app", ["ui.router", "ui.bootstrap", "ui-notification", "firebase", "jcs-autoValidate"]);
	
	/*app config*/
	app.config([
		"$stateProvider", 
		"NotificationProvider",
		function ($stateProvider, NotificationProvider) {
		$stateProvider.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		});
		
		NotificationProvider.setOptions({
			delay: 5000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 20,
			horizontalSpacing: 20,
			positionX: "left",
			positionY: "bottom",
			maxCount: 5
		});
	}]);
	
	app.run(['bootstrap3ElementModifier', function (bootstrap3ElementModifier) {
		bootstrap3ElementModifier.enableValidationStateIcons(true);
	}]);
}());
