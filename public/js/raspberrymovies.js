'use strict';

//// Get a database reference to our posts
var raspberryMovies = angular.module('raspberryMovies', ['ui.router','firebase']);

    // configure our routes
    raspberryMovies.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('home', {
                url: '/',
                templateUrl : 'pages/home.html',
                controller  : 'MainCtrl as mainCtrl'
            })

            // route for the choose page
            .state('choose', {
                url: '/choose',
                templateUrl : 'pages/choose.html',
                controller  : 'ChooseCtrl as chooseCtrl'
            })

            // route for the watch page
            .state('watch', {
                url: '/watch',
                templateUrl : 'pages/watch.html',
                controller  : 'WatchCtrl as watchCtrl'
            });
        $urlRouterProvider.otherwise('/');
    });

raspberryMovies.constant('FirebaseUrl', 'https://raspberrymovies.firebaseio.com/');


raspberryMovies.factory('Raspberry',function($firebaseArray, $firebaseObject,FirebaseUrl) {
    var raspberryRef = new Firebase(FirebaseUrl+'/raspberry');
    var raspberry = $firebaseArray(raspberryRef);
    
    var Raspberry = {
        all: raspberry,
        ref: raspberryRef
    };
    
    return Raspberry;
});



    // create the controller and inject Angular's $scope
    raspberryMovies.controller('MainCtrl', function() {
        var mainCtrl = this;
        // create a message to display in our view
        mainCtrl.message = 'Raspberry Movies home page!';
    });

    raspberryMovies.controller('ChooseCtrl', function($state, $scope) {
        var chooseCtrl = this;
        $scope.message = 'Choose your next movie for your friend.';
    });

    raspberryMovies.controller('WatchCtrl', function(Raspberry,$firebaseObject) {
        
        var watchCtrl = this;
        watchCtrl.message = 'before getting firebase stuff';
                
        var obj = $firebaseObject(Raspberry.ref);

         // to take an action after the data loads, use the $loaded() promise
         obj.$loaded().then(function() {
            console.log("loaded record:", obj.$id, obj.flashled);
         });
        
        
//        raspberryRef.on('value', function(snapshot) {
//         console.log(snapshot.val());
//            if(snapshot.val().bikes.bay1){
//                console.log('bay1 is: ' + snapshot.val().bikes.bay1);
//                //$scope.message = 'You have a movie waiting. Press the button on the Raspberry Pi to show it.';
//                watchCtrl.message = 'You have a movie waiting. Press the button on the Raspberry Pi to show it.';
//            }
//            else{
//                console.log('bay1 is: ' + snapshot.val().bikes.bay1);
//                //$scope.message = 'Watch your movie here.';
//                watchCtrl.message = 'Watch your movie here.';
//            }
//        }, function (errorObject) {
//          console.log("The read failed: " + errorObject.code);
//        });
        
        console.log('I am a string');

    });