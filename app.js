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
	
  var app = angular.module("app", ["ui.router", "ui.bootstrap", "firebase"]);
	
	/*app config*/
	app.config(function ($stateProvider) {
		$stateProvider.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		});
	});
}());
