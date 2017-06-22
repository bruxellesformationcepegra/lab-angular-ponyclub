var app = angular.module("ponyApp", []);

app.controller("PonyController", function($http, $log){
    var myController = this;
    myController.ponyList = [];
    myController.isLoading = true;
    myController.isError = false;
    myController.newPony = {name:"",description:""};

    $http.get("https://ponies-nbwns.c9users.io/ponies")
    .then(function(response){
        myController.ponyList = response.data;
    })
    .catch(function(){
        myController.isError = true;
    })
    .finally(function(){
        myController.isLoading = false;
    });


    myController.add = function(){
        $http.post("https://ponies-nbwns.c9users.io/pony", myController.newPony)
        .then(function(response){
            $log.log(response.data);
            myController.ponyList.push(myController.newPony);
            myController.newPony = {name:"",description:""};
        })
        .catch(function(){
            $log.log("Erreur d'envoi du poney");
        })
        .finally(function(){
        });
    };
});