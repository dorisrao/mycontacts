'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//Contacts Controller
.controller('ContactsCtrl', ['$scope', '$http', '$firebaseArray', function($scope, $http, $firebaseArray) {
    //Get contacts
    var ref = new Firebase('https://mycontacts-47957.firebaseio.com/');
    $scope.contacts = $firebaseArray(ref);
	
 //    $http.get('/contacts.json').success(function(data){
	// 	$scope.contacts = data;
	// 	console.log('$scope.contacts: ', $scope.contacts);
	// })

	//Show add form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}
	//Hide add form
	$scope.hide = function(){
		$scope.addFormShow = false;
        $scope.contactShow = false;
        $scope.editFormShow = false;
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
        
        //Build Object
        $scope.contacts.$add({
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
        }).then(function(ref){
            var id = ref.key();
            console.log('Added contact with ID: '+id);

            //Clear fields
            clearFields();
            
            //Hide form
            $scope.addFormShow = false;
            
            //Send messgae
            $scope.msg = "Contact Added";  
        })

        // //Add new contact
        // $scope.contacts.push({
        //     name: name,
        //     email: email,
        //     company: company,
        //     work_phone: work_phone,
        //     mobile_phone: mobile_phone,
        //     home_phone: home_phone,
        //     street_address: street_address,
        //     city: city,
        //     state: state,
        //     zipcode: zipcode
        // });  
	}
    

    //Edit Contact
    $scope.editFormSubmit = function(){
        console.log('updating contact...');
        //Edit contacts
        // for (var i=0; i<$scope.contacts.length; i++){
        //     if($scope.contacts[i].name == $scope.name && $scope.contacts[i].email == $scope.email){
        //         $scope.contacts[i].name = $scope.name;
        //         $scope.contacts[i].email = $scope.email;
        //         $scope.contacts[i].company = $scope.company;
        //         $scope.contacts[i].mobile_phone = $scope.mobile_phone;
        //         $scope.contacts[i].home_phone = $scope.home_phone;
        //         $scope.contacts[i].work_phone = $scope.work_phone;
        //         $scope.contacts[i].street_address = $scope.street_address;
        //         $scope.contacts[i].city = $scope.city;
        //         $scope.contacts[i].state = $scope.state;
        //         $scope.contacts[i].zipcode = $scope.zipcode;
        //     }
        // }

        //Get edit ID
        var id = $scope.edit_id;
        console.log('id ', id);

        //Get Record
        var record = $scope.contacts.$getRecord(id);
        console.log('saving record ', record);

        //Assign values
        record.name = $scope.name;
        record.email = $scope.email;
        record.company = $scope.company;
        record.mobile_phone = $scope.mobile_phone || null;
        record.home_phone = $scope.home_phone || null;
        record.work_phone = $scope.work_phone || null;
        record.street_address = $scope.street_address || null;
        record.city = $scope.city || null;
        record.state = $scope.state || null;
        record.zipcode = $scope.zipcode || null;

        //Save contact
        $scope.contacts.$save(record).then(function(ref){
            console.log(ref.key);
        })

        //Clear fields
        clearFields();
        
        //Hide form:
        $scope.editFormShow = false;
        
        //Send message
        $scope.msg = "Contact Updated";
    }

    
    //Remove Contact
    $scope.removeContact = function(contact){
//        $scope.id = contact.id;
//        for (var i=0; i<$scope.contacts.length; i++){
//            if($scope.contacts[i].id == $scope.id){
//                $scope.contacts.splice(i, 1);
//            }
//        }
        // $scope.contacts.splice(index, 1);
        $scope.contacts.$remove(contact);
        $scope.msg = "Contact Removed";
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
    $scope.showEditForm = function(index){
        $scope.editFormShow = true;

        //Get edit ID
        $scope.edit_id = $scope.contacts[index].$id;

        $scope.name = $scope.contacts[index].name;
        $scope.email = $scope.contacts[index].email;
        $scope.company = $scope.contacts[index].company;
        $scope.mobile_phone = $scope.contacts[index].mobile_phone;
        $scope.home_phone = $scope.contacts[index].home_phone;
        $scope.work_phone = $scope.contacts[index].work_phone;
        $scope.street_address = $scope.contacts[index].street_address;
        $scope.city = $scope.contacts[index].city;
        $scope.state = $scope.contacts[index].state;
        $scope.zipcode = $scope.contacts[index].zipcode;   
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




