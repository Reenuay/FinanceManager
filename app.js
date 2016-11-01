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
	app.config(["$stateProvider", "NotificationProvider",
	function ($stateProvider, NotificationProvider) {
		//All possible routes
		$stateProvider
		.state({
			name: "entrypoint",
			url: "",
			redirectOn: "login"
		})
		.state({
			name: "root",
			url: "/",
			redirectOn: "login"
		})
		.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		})
		.state({
			name: "forgotpassword",
			url: "/forgotpassword"
		})
		.state({
			name: "main",
			url: "/main",
			templateUrl: "app/main/main.template.html"
		});
		
		//Notification tool config
		NotificationProvider.setOptions({
			delay: 10000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 10,
			horizontalSpacing: 20,
			positionX: "left",
			positionY: "bottom",
			maxCount: 5
		});
	}]);
	
	//Validation decorator config
	app.run(['bootstrap3ElementModifier', function (bootstrap3ElementModifier) {
		bootstrap3ElementModifier.enableValidationStateIcons(true);
	}]);
	
	//Redirection on not-authenticated
	app.run( function ($rootScope, $location, $state, $firebaseAuth) {
		$rootScope.$on( '$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
			//If authenticated
			if ($firebaseAuth().$getAuth()) {
				if (toState.name === "entrypoint" || toState.name === "root" || toState.name === "login" || toState.name === "forgotpassword") {
					e.preventDefault();//stop current execution
					$state.go('main');//go to main
				}
			} else {
				if (toState.name === "login" || toState.name === "forgotpassword") {
					return;//no need to redirect
				}
				
				e.preventDefault();//stop current execution
				$state.go('login');//go to login
			}
		});
		
		//When session expires go to login page
		$firebaseAuth().$onAuthStateChanged( function (firebaseUser) {
      if (!firebaseUser)
				$state.go('login');//go to login
			else
				$state.go('main');//go to main
    });
	});
}());
