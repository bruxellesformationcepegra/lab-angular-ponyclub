var ponyApp = angular.module("ponyApp", []);

function request($http, ponyController){
    ponyController.error = false;
    ponyController.loading = true;
    $http.get("https://ponies-nbwns.c9users.io/ponies")
    .then(function(response){
        ponyController.ponies = response.data;
    })
    .catch(function(){
        ponyController.error = true;
    })
    .finally(function(){
        ponyController.loading = false;
    });
}


ponyApp.controller("PonyController", function($http){
    var ponyController = this;
    ponyController.ponies = [];
    ponyController.newPony = {};

    request($http, ponyController);

    ponyController.add = function(){
        $http.post("https://ponies-nbwns.c9users.io/pony", ponyController.newPony)
        .then(function(response){
            request($http, ponyController);
            ponyController.newPony = {};
        })
        .catch(function(){
            ponyController.error = true;
        })
    };
});