'use strict'
var app = angular.module('App', []);

app.controller('Ctrl', function ($scope, $http) {
    var url ='http://localhost:8000/api/'
    
    if(!localStorage.getItem("API_TOKEN")){
        window.location.replace('login.html');
    }
    $scope.SaveAuthorbook= function(authorbook){
        $http({
            method: 'POST',
            url: url +'/authorbook',
            data: JSON.stringify(authorbook),
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#NewAuthorbook').modal('hide');
            console.log(respuesta.data);
            authorbook.author = "";
            authorbook.book = "";
            $scope.registros.push(respuesta.data.data);
            alert(respuesta.data.message);
        }, function error(respuesta) {
            alert("No se pudo guardar");

        });
    }

    $scope.Logout = function(){
        localStorage.removeItem("API_TOKEN");
        window.location.replace('login.html');
    }
    
    $scope.ListAuthorbooks = function () {
        $http({
            method: 'GET',
            url: url + '/authorbooks',
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }
    $scope.modalUpdate = function(authorbook){
        $scope.authorbook = authorbook;
    }

    $scope.UpdateAuthorbook= function(authorbook){
        console.log(authorbook);
        $http.put(url+'authorbook/'+ authorbook._id, authorbook,{headers: {'Authorization': localStorage.getItem("API_TOKEN") }}).
        then(function succes(respuesta) {
            $('#UpdateBook').modal('hide');
            authorbook.author = "";
            authorbook.book = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

    $scope.modalBorrar = function(authorbook){
        $scope.authorbook = authorbook;
    }

    $scope.BorrarAuthorbook = function(){
        console.log($scope.authorbook);
        var authorbook = $scope.authorbook; 
        $http({
            method: 'DELETE',
            url:  url+'authorbook/'+ authorbook._id,
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#DeleteAuthor').modal('hide');
            authorbook.author = "";
            authorbook.book = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

});