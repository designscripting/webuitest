var yumeApp = angular.module( "yumeApp",[] );
yumeApp.controller( "reporting",function( $scope, dataSource, $timeout){
   $scope.orders = dataSource.getData();
   $scope.addChart = function(index){
        $timeout(function(){
           var data1 = $scope.orders.orders[index].data1;
           var data2 = $scope.orders.orders[index].data2;
           data1.push("data1");
           data2.push("data2");
           index +=1;
           $(".pgrdemo"+index).animate({
                width: $scope.orders.orders[index-1].goal+"%"
            }, 0);
           
            var chart = c3.generate({
                data: {
                    columns: [
                        data1,
                        data2
                    ]
                },
                bindto: '#chart'+index
                });
       },1000)
       
   }
}).
service( "dataSource", function($http){
   var orders = {};
   this.getData = function(){
        $http.get('./data/insertionOrders.json').success(function(data){
            orders.orders = data;
        });
        return orders;
   };
});