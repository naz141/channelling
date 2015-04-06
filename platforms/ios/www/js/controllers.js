angular.module('starter.controllers', ["ngStorage"])


.controller("ExampleController", function($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }
})

.controller('DashCtrl', function($scope, $http, $state, $localStorage, $ionicLoading,$ionicPopup) {
	
	   
	   if (  $localStorage.message == 1)
	   {
	   $state.go('tab.tab-welcome');  
	   
	   }
	   $ionicLoading.hide();
	   
	 $scope.loginCheck = function(user) { 
	
	   
	   var email1= angular.lowercase(user.name);
      $http.post("http://www.qatarperfectmedia.com/channel/checkLogin.php?u="+user.name+"&p="+user.password).success(function(user_data, status, headers, config){
	   //$scope.allusers = user_data;
	   $ionicLoading.show({
    	template: 'Loading...'
   	});	 
	  var email = user_data[0].email; 
	  var myuserid = user_data[0].uid; 
	  $localStorage.email = email;
	  $localStorage.userid = myuserid;
	  
	   
	   if (email1 == email) {
		    $localStorage.message = 1;
	   $state.go('tab.tab-welcome');
	   
	  }
	   $ionicLoading.hide();
	 
       }).error(function(user_data) { 
						$ionicLoading.hide();
                        $scope.msgs= "Email or Password is Incorrect"
						 
                    });
                }
	
})

.controller('SignupCntrl', function ($scope, $http, $ionicPopup,$state,$ionicLoading){
	  $scope.signupUser = function (user) {
		//  $ionicLoading.show({
    	//template: 'Please wait...'
   //	});
    $http.post("http://www.qatarperfectmedia.com/channel/signup.php?name="+user.name+"&email="+user.email+"&pass="+user.pass).success(function(data, status, headers, config) {
		$ionicLoading.hide();
		$ionicPopup.alert({
             title: 'Success!',
              content: '<p>Registration Successful</p>'
		}).then(function() {
		$state.go('tab.dash');
        });
                    })
				};
	
	
	
})
 
.controller('WelcomeCtrl', function($scope, $http, $localStorage,$state) {
	 $scope.clear = function() {		
					delete $localStorage.userid;
					$localStorage.$reset();
					$state.go('tab.dash');
                }
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/myprofile.php?id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.loading = false;
       });
	   $scope.doRefresh = function() {
		   $scope.loading = false;
		   $http.post("http://www.qatarperfectmedia.com/channel/myprofile.php?id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.$broadcast('scroll.refreshComplete');
	   });
	   }
	  
	
})

.controller('ChannelCtrl', function($scope) {})


.controller('ClinicsCtrl', function($scope, $http) {
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/allclinics.php").success(function(allclinics){
	   $scope.clinics = allclinics;
	   $scope.loading = false;
       }); 
	
})


.controller('MyprofileCtrl', function($scope, $http, $localStorage,$state) {
	 $scope.clear = function() {		
					delete $localStorage.userid;
					$localStorage.$reset();
					$state.go('tab.dash');
                }
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/myprofile.php?id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.loading = false;
       });
	   $scope.doRefresh = function() {
		   $scope.loading = false;
		   $http.post("http://www.qatarperfectmedia.com/channel/myprofile.php?id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.$broadcast('scroll.refreshComplete');
	   });
	   }
	  
	
})

.controller('MystatusCtrl', function($scope, $http, $localStorage) {
	
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getAppStatus.php?u_id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.loading = false;
       });
	   $scope.doRefresh = function() {
		   $scope.loading = false;
		   $http.post("http://www.qatarperfectmedia.com/channel/getAppStatus.php?u_id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.$broadcast('scroll.refreshComplete');
	   });
	   } 
})
.controller('MyClstatusCtrl', function($scope, $http, $localStorage) {
	
	$scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getClAppStatus.php?u_id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.loading = false;
       });
	   $scope.doRefresh = function() {
		   $scope.loading = false;
		   $http.post("http://www.qatarperfectmedia.com/channel/getClAppStatus.php?u_id="+$localStorage.userid).success(function(statusData){
	   $scope.appstatus = statusData;
	   $scope.$broadcast('scroll.refreshComplete');
	   });
	   } 
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


.controller('DocDetailCtrl', function($scope, $http, $stateParams, $filter, $ionicPopup, $state, $localStorage , $ionicLoading) {
	
    $scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getdocdetails.php?doc_id="+$stateParams.chatId).success(function(doc_data){
	   $scope.allDocs = doc_data;
	   $scope.loading = false;
	   $scope.id = doc_data[0].doc_id_t;
       });
  //$scope.chat = Chats.get($stateParams.chatId);
 
  			  $scope.makeApp = function (task) {
				  $ionicLoading.show({
					template: 'Making Appointment...'
				});
				  	
				  var appDate = $filter('date')(task.date, "dd/MM/yyyy");
				  var appTime = $filter('date')(task.time, "shortTime");
    $http.post("http://www.qatarperfectmedia.com/channel/make_app.php?d_id="+$scope.id+"&date="+appDate+"&time="+appTime+"&user="+$localStorage.userid).success(function(data, status, headers, config) {
		$ionicLoading.hide();
		$ionicPopup.alert({
             title: 'Success!',
              content: '<p>Your Appointment has been sent successfully and it is still on pending.  </p><p>Please wait till we notify you once the administration approves your appointment</p><p>Thank you</p>'
		}).then(function() {
		$state.go('mystatus');
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
.controller('ClininDetailCtrl', function($scope, $http, $stateParams, $filter, $ionicPopup, $state, $localStorage , $ionicLoading) {
	
    $scope.loading = true;
	$http.post("http://www.qatarperfectmedia.com/channel/getcldetails.php?cl_id="+$stateParams.chatId).success(function(cl_data){
	   $scope.cl_datas = cl_data;
	   $scope.loading = false;
	   $scope.id = cl_data[0].cl_id;
       });
  //$scope.chat = Chats.get($stateParams.chatId);
 
  			  $scope.makeApp = function (task) {
				  $ionicLoading.show({
					template: 'Making Appointment...'
				});
				  	
				  var appDate = $filter('date')(task.date, "dd/MM/yyyy");
				  var appTime = $filter('date')(task.time, "shortTime");
    $http.post("http://www.qatarperfectmedia.com/channel/make_cl_app.php?cl_id="+$scope.id+"&date="+appDate+"&time="+appTime+"&user="+$localStorage.userid).success(function(data, status, headers, config) {
		$ionicLoading.hide();
		$ionicPopup.alert({
             title: 'Success!',
              content: '<p>Your Appointment has been sent successfully and it is still on pending.  </p><p>Please wait till we notify you once the administration approves your appointment</p><p>Thank you</p>'
		}).then(function() {
		$state.go('mystatus');
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
   $scope.loading2 = true;
   $http.post("http://www.qatarperfectmedia.com/channel/getalldoc.php").success(function(all_doc_data){
	    $scope.loading2 = false ; 
        $scope.all_data = all_doc_data;
       });
 
  
				$scope.errors = [];
                $scope.msgs = [];
				//getTask(); // Load all available tasks 
  $scope.getDoc = function (input){ 
   $scope.loading = true ; 
  $http.post("http://www.qatarperfectmedia.com/channel/getdoctors.php?h_id="+input.h+"&s_id="+input.s).success(function(doc_data){
	    $scope.loading = false ; 
		$scope.result = "Search Results"
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

