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
          window.location.replace('index.html');
        },function error(){
            //console.log(response.data);
            alert("Datos incorrectos")
        })
    }

    $scope.register = function(name, email, password){
        var data={
            email: email,
            password: password,
            name: name
        };
        $http.post(server+'/user',JSON.stringify(data))
        .then(function(response){
          console.log(response.data);
          window.location.replace('login.html');
        },function error(){
            //console.log(response.data);
            alert("No se pudo crear la cuenta")
        })
    }
});