storeApp.controller('storeController', function ($scope, $http, $routeParams, DataService) {

	$scope.store = DataService.store;
	$scope.cart = DataService.cart;
	$scope.strings = DataService.strings;

	if ($routeParams.sku != null) {
		$scope.product = $scope.store.getProduct($routeParams.sku);
	}

	// moved to app.js DataService
	// $http.get('data/products.json').success(function(data) {
	// 	$scope.store.products = data;
	// });

});
