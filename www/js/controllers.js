angular.module('starter.controllers', [])
 
.controller('DashCtrl', function($scope) {})
.controller('WelcomeCtrl', function($scope) {}) 
.controller('ChannelCtrl', function($scope) {})
.controller('MyprofileCtrl', function($scope) {})

.controller('MystatusCtrl', function($scope, $http) {
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getAppStatus.php?u_id=1").success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.loading = false;
       });
})




.controller('customersController', function($scope,$http) {
  $http.get("http://www.w3schools.com/website/customers_mysql.php")
  .success(function(response) {$scope.names = response;});
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

 
/* .controller('DocDetailCtrl', function($scope, $timeout, $q, $ionicPopup, $state) {

  
          $scope.showAlert = function() {
            $ionicPopup.alert({
              title: 'Success!',
              content: '<p>Your Appointment has been sent successfully and it is still on pending.  </p><p>Please wait till we notify you once the administration approves your appointment</p><p>Thank you</p>'
			}).then(function() {
			$state.go('tab.tab-welcome');
            });
          }; 
  
}) */
.controller('DocDetailCtrl', function($scope, $http, $stateParams, $filter, $ionicPopup, $state) {
	
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getdocdetails.php?doc_id="+$stateParams.chatId).success(function(doc_data){
	   $scope.allDocs = doc_data;
	   $scope.loading = false;
	   $scope.id = doc_data[0].doc_id_t;
       });
  //$scope.chat = Chats.get($stateParams.chatId);
  			  $scope.makeApp = function (task) {
				
				  var appDate = $filter('date')(task.date, "dd/MM/yyyy");
				  var appTime = $filter('date')(task.time, "shortTime");
    $http.post("http://www.qatarperfectmedia.com/channel/make_app.php?d_id="+$scope.id+"&date="+appDate+"&time="+appTime).success(function(data, status, headers, config) {
		$ionicPopup.alert({
             title: 'Success!',
              content: '<p>Your Appointment has been sent successfully and it is still on pending.  </p><p>Please wait till we notify you once the administration approves your appointment</p><p>Thank you</p>'
		}).then(function() {
		$state.go('tab.tab-welcome');
        });
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
						getTask();
                    }).error(function(data, status) { 
                        $scope.errors.push(status);
                    });
				};
	 
})

.controller('SearchCntrl', function($scope, $http) {
	 
	$scope.products = [];
	$scope.allspecialty = [];
	$scope.loading = true;
	
	$http.post("http://www.qatarperfectmedia.com/channel/getH.php")
   .success(function(data){  $scope.products = data;});
      
	$http.post("http://www.qatarperfectmedia.com/channel/getS.php")
   .success(function(sp_data){$scope.allspecialty = sp_data; $scope.loading = false;}); 
 
  
				$scope.errors = [];
                $scope.msgs = [];
				//getTask(); // Load all available tasks 
  $scope.getDoc = function (input){ 
   $scope.loading = true ; 
  $http.post("http://www.qatarperfectmedia.com/channel/getdoctors.php?h_id="+input.h+"&s_id="+input.s).success(function(doc_data){
	    $scope.loading = false ; 
        $scope.allDocs = doc_data;
       });
  };
				
				  $scope.addTask = function (task) {
    $http.post("http://www.qatarperfectmedia.com/channel/postdata.php?task="+task.h+"&status="+task.s).success(function(data, status, headers, config) {
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
						getTask();
                    }).error(function(data, status) { 
                        $scope.errors.push(status);
                    });
  };
      
            })

.controller('OldSearchCntrl', function($scope, $http) {
	
	$scope.errors = [];
                $scope.msgs = [];

                $scope.SignUp = function() {
					

                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
					
					$http.post('http://www.qatarperfectmedia.com/channel/postdata.php', {'h':$scope.h, 's':$scope.s}
                    ).success(function(data, status, headers, config) {
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });
                }
               
            })
			
			
			
			 
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

