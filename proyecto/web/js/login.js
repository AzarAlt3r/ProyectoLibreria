'use strict'

var app = angular.module('Login',[]);
var server = 'http://localhost:8000/api'


app.controller('CtrlLogin', function($scope,$http){

    $scope.email = '';
    $scope.password = '';

    $scope.login = function(email, password){

        var data={
            email: email,
            password: password
        };
        $http.post(server+'/login',JSON.stringify(data))
        .then(function(response){
          console.log(response.data);
          localStorage.setItem("API_TOKEN", response.data.token);
          window.location.replace('authors.html');
        },function error(){
            //console.log(response.data);
            alert("Datos incorrectos")
        })
    }

});