var storeApp = angular.module('AngularStore', ['ngRoute']);

storeApp.config(function ($routeProvider) {
  $routeProvider
  .when('/store', { 
    templateUrl: 'partials/store.html',
    controller: 'storeController' 
  })
  .when('/products/:sku', {
    templateUrl: 'partials/product.html',
    controller: 'storeController'
  })
  .when('/cart', { 
    templateUrl: 'partials/shoppingCart.html',
    controller: 'storeController'
  })
  .otherwise({ redirectTo: '/store'});
});

// ---------------------------------------------

storeApp.factory("DataService", function ($http) {

    // atring constants
    var myStrings = new strings();

    // create store
    var myStore = new store();
    // generateProducts works, but loadProductsFromFile doesn't work
    //myStore.loadProductsFromFile($http);
    //myStore.generateProducts();
    $http.get('data/products.json').success(function(data) {
        myStore.products = data;
    });



    // create shopping cart
    var myCart = new shoppingCart("AngularStore");

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "bernardo.castilho-facilitator@gmail.com");

    // enable Google Wallet checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with Google Wallet, you have to create a merchant account with 
    // Google. You can do that here:
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    myCart.addCheckoutParameters("Google", "500640663394527",
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    // return data object with store and cart
    return {
        strings: myStrings,
        store: myStore,
        cart: myCart
    };
});