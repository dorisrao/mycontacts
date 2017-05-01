'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//Contacts Controller
.controller('ContactsCtrl', ['$scope', '$http', function($scope, $http) {
	// var ref = new Firebase('https://.firebaseio.com/contacts');
	// var config = {
	//   apiKey: "AIzaSyDWnuFI_mHHXik1VYtZV72FDnc7UJyruNA",
	//   authDomain: "mycontacts-47957.firebaseapp.com",
	//   databaseURL: "https://mycontacts-47957.firebaseio.com"
	// };
	// firebase.initializeApp(config);
	// var ref = firebase.database().ref();

	// $scope.contacts = $firebaseArray(ref);
	
    $http.get('/contacts.json').success(function(data){
		$scope.contacts = data;
		console.log($scope.contacts);
	})

	//Show add form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}
	//Hide add form
	$scope.hide = function(){
		$scope.addFormShow = false;
        $scope.contactShow = false;
	}
	//Submit contact
	$scope.addFormSubmit = function(){
		console.log('adding contact...');

		//Assign values
		if($scope.name){ var name = $scope.name; } else {var name = null; }
		if($scope.email){ var email = $scope.email; } else {var email = null; }
		if($scope.company){ var company = $scope.company; } else { var company = null; }
		if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = null; }
		if($scope.home_phone){ var home_phone = $scope.home_phone; } else { var home_phone = null; }
		if($scope.work_phone){ var work_phone = $scope.work_phone; } else { var work_phone = null; }
		if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = null; }
		if($scope.city){ var city = $scope.city; } else { var city = null; }
		if($scope.state){ var state = $scope.state; } else { var state = null; }
		if($scope.zipcode){ var zipcode = $scope.zipcode; } else { var zipcode = null; }
        
        //Add new contact
        $scope.contacts.push({
            name: name,
            email: email,
            company: company,
            work_phone: work_phone,
            mobile_phone: mobile_phone,
            home_phone: home_phone,
            street_address: street_address,
            city: city,
            state: state,
            zipcode: zipcode
        });
        
        
        //Clear fields
        clearFields();
        
        //Hide form
        $scope.addFormShow = false;
        
        //Send messgae
        $scope.msg = "Contact Added";   
	}
    
    
    //Edit Contact
    $scope.editFormSubmit = function(){
        console.log('updating contact...');
        console.log($scope.id);
        for (var i=0; i<$scope.contacts.length; i++){
            if($scope.contacts[i].id == $scope.id){
                $scope.contacts[i].name = $scope.name;
                $scope.contacts[i].email = $scope.email;
                $scope.contacts[i].company = $scope.company;
                $scope.contacts[i].mobile_phone = $scope.mobile_phone;
                $scope.contacts[i].home_phone = $scope.home_phone;
                $scope.contacts[i].work_phone = $scope.work_phone;
                $scope.contacts[i].street_address = $scope.street_address;
                $scope.contacts[i].city = $scope.city;
                $scope.contacts[i].state = $scope.state;
                $scope.contacts[i].zipcode = $scope.zipcode;
//            console.log($scope.contacts);
            }
        }
        
        //clear fields
        clearFields();
        
        //Hide form:
        $scope.editFormShow = false;
        
        //Send message
        $scope.msg = "Contact Updated";
    }

    
    //Remove Contact
    $scope.removeContact = function(contact, index){
//        $scope.id = contact.id;
//        for (var i=0; i<$scope.contacts.length; i++){
//            if($scope.contacts[i].id == $scope.id){
//                $scope.contacts.splice(i, 1);
//            }
//        }
        $scope.contacts.splice(index, 1);
        $scope.msg = "Contact Removed" 
    }
    
    
    //Show Contact
    $scope.showContact = function(contact){
        console.log('getting contact...')
        
        $scope.contactShow = true;
        
        $scope.show_name = contact.name;
        $scope.show_email = contact.email;
        $scope.show_company = contact.company;
        $scope.show_mobile_phone = contact.mobile_phone;
        $scope.show_home_phone = contact.home_phone;
        $scope.show_work_phone = contact.work_phone;
        $scope.show_street_address = contact.street_address;
        $scope.show_city = contact.city;
        $scope.show_state = contact.state;
        $scope.show_zipcode = contact.zipcode;

    }
    
    
    //Show Edit Form
    $scope.showEditForm = function(contact){
        
        $scope.editFormShow = true;
//      alert($scope.name);
        
        $scope.id = contact.id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.mobile_phone = contact.mobile_phone;
        $scope.home_phone = contact.home_phone;
        $scope.work_phone = contact.work_phone;
        $scope.street_address = contact.street_address;
        $scope.city = contact.city;
        $scope.state = contact.state;
        $scope.zipcode = contact.zipcode;   
    }
    

    
    //Function to clear fields
    var clearFields = function(){
        console.log("clearing all the fields...");
        
        $scope.name = "";
        $scope.email = "",
        $scope.company = "";
        $scope.mobile_phone = "";
        $scope.home_phone = "";
        $scope.work_phone = "";
        $scope.street_address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zipcode = "";
    }
    
    
}]);




