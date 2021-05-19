'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', function ($scope,$http) {
	$scope.contacts = [];
    let url = 'http://192.168.1.5:8888/api/v1';

    function init(){
        $http({
            method: 'GET',
            url: url + '/getContacts'
        }).then(function successCallback(response) {
            let {data,status} = response;
            if(status===200)
            {
                $scope.contacts = data;
            }
        }, function errorCallback(response) {
    
        });
    }

    init();
	
    $scope.handleSave = function(){
        $http({
            method: 'POST',
            url: url + '/createContact',
            data : {
                displayName : $scope.displayName,
                number:$scope.number
            }
        }).then(function successCallback(response) {
            let {data,status} = response;
            if(status===201)
            {
                $scope.contacts.push(data.contact);
                $scope.displayName = "";
                $scope.number = "";
            }
        }, function errorCallback(response) {
    
        });
    };

    $scope.handleDelete = function (user,index){
         $http({
            method: 'DELETE',
            url: url + '/deleteContact',
            params : {
                _id: user._id
            }
        }).then(function successCallback(response) {
            let {data,status} = response;
            if(status===200)
            {
                $scope.contacts.splice(index,1)
            }
        }, function errorCallback(response) {
    
        });
    }

    $scope.handleEditActive = function (user){
        user.active = !user.active;
    }

    $scope.handleEdit = function (user,index){
         $http({
            method: 'PUT',
            url: url + '/editContact',
            data : {
                _id :user._id,
                displayName : user.displayName,
                number : user.number
            }
        }).then(function successCallback(response) {
            let {data,status} = response;
            if(status===201)
            {
                let newContacts = $scope.contacts.map((item,i)=>(i===index ? user : item));
                $scope.contacts = newContacts;
                user.active = !user.active;
            }
        }, function errorCallback(response) {
    
        });
    }
    
});
