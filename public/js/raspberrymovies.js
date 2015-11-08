// Get a database reference to our posts
var ref = new Firebase("https://raspberrymovies.firebaseio.com/");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {

  var standStatus = snapshot.val(); 
  console.log(standStatus);

    jQuery.each(standStatus.bikes, function(index,element) {
        console.log(index);
        console.log(element);
       
       if(element){
          $('#'+ index).removeClass('btn-default');
          $('#'+ index).addClass('btn-success');
          $('#'+ index).removeClass('btn-danger');
        } 
        else {
          $('#'+ index).removeClass('btn-default');
          $('#'+ index).removeClass('btn-success');
          $('#'+ index).addClass('btn-danger');
        }
    });

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var raspberryMovies = angular.module('raspberryMovies', ['ngRoute']);

    // configure our routes
    raspberryMovies.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/choose', {
                templateUrl : 'pages/choose.html',
                controller  : 'chooseController'
            })

            // route for the contact page
            .when('/watch', {
                templateUrl : 'pages/watch.html',
                controller  : 'watchController'
            });
    });

    // create the controller and inject Angular's $scope
    raspberryMovies.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    raspberryMovies.controller('chooseController', function($scope) {
        $scope.message = 'Choose your next movie for your friend.';
    });

    raspberryMovies.controller('watchController', function($scope) {
        $scope.message = 'Your friend chose a movie for you. Watch it here.';
    });