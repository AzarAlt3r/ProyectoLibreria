'use strict'
var app = angular.module('App', []);
app.controller('Ctrl', function ($scope, $http) {
    var url ='http://localhost:8000/api/'

    if(!localStorage.getItem("API_TOKEN")){
        window.location.replace('login.html');
    }
    $scope.SaveBook= function(book){
        $http({
            method: 'POST',
            url: url +'/book',
            data: JSON.stringify(book),
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#NewBook').modal('hide');
            console.log(respuesta.data);
            book.title = "";
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

    $scope.ListBooks = function () {
        $http({
            method: 'GET',
            url: url + '/books',
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }
    $scope.modalUpdate = function(book){
        $scope.book = book;
    }

    $scope.UpdateBook= function(book){
        console.log(book);
        $http.put(url+'book/'+ book._id, book,{headers: {'Authorization': localStorage.getItem("API_TOKEN") }}).
        then(function succes(respuesta) {
            $('#UpdateBook').modal('hide');
            book.title = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

    $scope.modalBorrar = function(book){
        $scope.book = book;
    }

    $scope.BorrarBook = function(){
        console.log($scope.book);
        var book = $scope.book; 
        $http({
            method: 'DELETE',
            url:  url+'book/'+ book._id,
            headers: {'Authorization': localStorage.getItem("API_TOKEN")}
        }).then(function succes(respuesta) {
            $('#DeleteAuthor').modal('hide');
            book.title = "";
            console.log(respuesta.data);
            $scope.registros = respuesta.data.data;
        }, function error(respuesta) {
            console.log(respuesta.data);
        });
    }

});
