'use strict'
var app = angular.module('App', []);
app.controller('Ctrl', function ($scope, $http) {


    var url ='http://localhost:8000/api/'

    if(!localStorage.getItem("API_TOKEN")){
        window.location.replace('login.html');
    }
    $scope.author = [];

    $scope.SaveAuthor= function(author){
        $http({
            method: 'POST',
            url: url +'/author',
            data: JSON.stringify(author),
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#NewAuthor').modal('hide');
            console.log(respuesta.data);
            author.name = "";
            author.contry = "";
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

    $scope.ListAuthors = function () {
        $http({
            method: 'GET',
            url: url +'/authors',
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            Logout();
        });
    }
    
    $scope.modalUpdate = function(author){
        $scope.author = author;
    }

    $scope.UpdateAuthor= function(author){
        console.log(author);
        $http.put(url+'author/'+ author._id, author,{headers: {'Authorization': localStorage.getItem("API_TOKEN") }}).
        then(function succes(respuesta) {
            $('#UpdateAuthor').modal('hide');
            author.name = "";
            author.contry = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

    $scope.modalBorrar = function(author){
        $scope.author = author;
    }

    $scope.BorrarAuthor = function(){
        console.log($scope.author);
        var author = $scope.author; 
        $http({
            method: 'DELETE',
            url:  url+'author/'+ author._id,
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#DeleteAuthor').modal('hide');
            author.name = "";
            author.contry = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

});