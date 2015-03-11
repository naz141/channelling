angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('WelcomeCtrl', function($scope) {}) 
.controller('ChannelCtrl', function($scope) {})
.controller('MyprofileCtrl', function($scope) {})
.controller('MystatusCtrl', function($scope) {})
.controller('DocdetailsCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) { 
    Chats.remove(chat);
  }
})

.controller('customersController', function($scope,$http) {
  $http.get("http://www.w3schools.com/website/customers_mysql.php")
  .success(function(response) {$scope.names = response;});
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

