var app = angular.module('todoApp',['ngRoute']);

const tasks = new Array();

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: 'partials/listTasks.html',controller: 'AppController'})
        .when('/details:id', {templateUrl: 'partials/detailsTask.html',controller: 'DetailsController'})
        .when('/add:id', {templateUrl: 'partials/addTask.html',controller: 'AddController'})
        .otherwise({redirectTo: ''})
})

app.controller('AppController',function AppController($scope, $location){
    $scope.tasks = tasks;
    $scope.options = new Array();
    $scope.tasks.forEach(function(task){
        if(!$scope.options.includes(task.category)){
            $scope.options.push(task.category);
        }
    });
    $scope.goToAdd = function () {
        $location.path("/add:"+(tasks.length));
        /*$scope.location = $location;
        $scope.$watch('location.path()', function(path){
        });*/
    }
    $scope.testAdd = function(){
        tasks.push({name:"dummy",desc:"dummy",duree:1,url:"dummy",date:"01/01/1970",category:"dummy"})
        $scope.tasks.forEach(function(task){
            if(!$scope.options.includes(task.category)){
                $scope.options.push(task.category);
            }
        });
    }
    $scope.RemoveTask = function(index){
        $scope.tasks.splice(index, 1);
    }
    $scope.details = function(index){
        $location.path("/details"+index);
    }
});

app.controller('AddController',function AppController($scope,$routeParams ,$location) {
    let id = $routeParams.id;
    let task = tasks[id];
    if(task){
        $scope.name = task.name;
        $scope.desc = task.desc;
        $scope.duree = task.duree;
        $scope.url = task.url;
        $scope.date = task.date;
        $scope.category = task.category;
    }
    $scope.addTask = function() {
        if(task){
            tasks[id] = {name:$scope.name,desc:$scope.desc,duree:$scope.duree,url:$scope.url,date:$scope.date,category:$scope.category};
            $location.path("details"+id);
        }else{
            tasks.push({name:$scope.name,desc:$scope.desc,duree:$scope.duree,url:$scope.url,date:$scope.date,category:$scope.category})
            $location.path("")
        }
    }
    $scope.cancel = function(){
        if(task){
            $location.path("details"+id);
        }else{
            $location.path("");
        }

    }
});

app.controller('DetailsController',function DetailsController($scope,$routeParams,$location){
    let id = $routeParams.id;
    $scope.task = tasks[id];
    $scope.valid = function(){
        $location.path("/");
    }
    $scope.delete = function(){
        tasks.splice(id, 1);
        $location.path("/");
    }
    $scope.edit = function(){
        $location.path("/add"+id);
    }
});