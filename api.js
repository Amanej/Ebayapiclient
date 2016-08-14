var ebay = require('ebay-api');
var fs = require('fs');

// Get settings
var settings = require('./settings.json');

var apiId = settings.apiId;
var _devId = settings.devId;
var _certId = settings.certId;

var _getProducts = function() {
  var params = {
    keywords: ["buddha","batman"]
  };

  ebay.xmlRequest({
    serviceName: 'Finding',
    opType: 'findItemsByKeywords',
    appId: apiId,
    // Authentication
    devId: _devId,
    certId: _certId,
    params: params,
    parser: ebay.parseResponseJson,
    sandbox: true
  },
   function itemsCallback(err,res) {
     if(err) throw err;

     var items = res.searchResult.item;

     for(var i = 0;i < items.length;i++) {
       //console.log('- ' + items[i].title);
       if(i < 6 && i > 3) {
         //console.dir(items[i]);
         console.log("Product returned no: "+i);
         console.log("Item id: "+items[i].itemId);
         console.log("Title: "+items[i].title);
         console.log("primaryCategory: "+items[i].primaryCategory);
         console.log("Url: "+items[i].viewItemURL);
         console.log("current price: "+items[i].sellingStatus.currentPrice.amount + " " + items[i].sellingStatus.currentPrice.currencyId);
         console.log("\n");
       }
     }
   });
};

var authToken = settings.authToken;

var _getCategoryDuration = function(catId) {
  var params = {
    CategoryID: catId,
    DetailLevel: "ReturnAll",
    ViewAllNodes: true,
    AllFeaturesForCategory: true
  };

  ebay.xmlRequest({
      serviceName: "Trading",
      opType: "GetCategoryFeatures",

      // Authentication
      devId: _devId,
      certId: _certId,
      appName: apiId,
      sandbox: true,

      authToken: authToken,

      params: params
      //parser: ebay.parseResponseJson,

  }, function durationCb(err,res) {
    if(err) {
      //console.log("We got errors");
      //console.log(err);
    } else {
      //console.log(res);
      //console.log(res);
      var _res = res;
      //console.dir(_res);
      // ListingDurations

      var stringified = JSON.stringify(_res,null,4);

      // Write fs
      fs.writeFile("testFeatures.txt",stringified, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });

      //console.log(_res.CategoryName);
      //console.log(_res.CategoryID);

      //console.log(_res.Categorys);
      /*for(var key in _res) {
        if(_res.hasOwnProperty(key)) {
          //console.dir(key);
          //console.log("->");
          console.dir(_res[key]);
        }
      }*/



    }
  });
}

var _getCategories = function() {
  var params = {
    DetailLevel: "ReturnAll"
  };

  ebay.xmlRequest({
      serviceName: "Trading",
      opType: "GetCategories",

      // Authentication
      devId: _devId,
      certId: _certId,
      appName: apiId,
      sandbox: true,

      authToken: authToken,

      params: params
      //parser: ebay.parseResponseJson,

  }, function categoryCb(err,res) {
    if(err) {
      //console.log("We got errors");
      console.log(err);
    } else {
      //console.log(res);
      //console.log(res);
      var _res = res;
      /*console.dir(_res);
      var stringified = JSON.stringify(_res,null,4);

      // Write fs
      fs.writeFile("test.txt",stringified, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });*/

      //console.log(_res.CategoryName);
      //console.log(_res.CategoryID);

      //console.log(_res.Categorys);
      /*for(var key in _res) {
        if(_res.hasOwnProperty(key)) {
          //console.dir(key);
          //console.log("->");
          console.dir(_res[key]);
        }
      }*/

      var _cats = _res.Categorys;

      _cats.forEach(function (category,index) {
        if(index < 150) {
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
        }
        //console.log(category.CategoryName);
        //console.log(category.CategoryID);
      });

    }
  });
};


//_getCategories();

//_getCategoryDuration("162983");

var _createListing = function() {
  var data = {
    categoryId: "162983",
    price: "24.99"
  }
  var Item = {
    "Title": "Pokemon Low Poly",
    "Description": "<h1>This is an awesome pokemon product</h1>Buy it now.",
    "PaymentMethods": "Paypal",
    "PaymentMethods": "CreditCard",
    "PrimaryCategory.CategoryID": data._categoryId,
    "StartPrice": data.price,
    "Site": "US",
    "ListingDuration": "Days_31",
    "Location": "Oslo, Norway",
    "Country": "NO",
    "Currency": "USD"
  }
  var params = {
    Item: Item
  };
  console.log("ListingDuration: "+Item.ListingDuration);

  ebay.xmlRequest({
      serviceName: "Trading",
      opType: "VerifyAddItem",

      // Authentication
      devId: _devId,
      certId: _certId,
      appName: apiId,
      sandbox: true,

      authToken: authToken,

      params: params
      //parser: ebay.parseResponseJson,

  }, function categoryCb(err,res) {
    if(err) {
      //console.log("We got errors");
      console.log(err);
    } else {
      //console.log(res);
      //console.log(res);
      var _res = res;
      /*console.dir(_res);
      var stringified = JSON.stringify(_res,null,4);

      // Write fs
      fs.writeFile("test.txt",stringified, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });*/

      //console.log(_res.CategoryName);
      //console.log(_res.CategoryID);

      //console.log(_res.Categorys);
      /*for(var key in _res) {
        if(_res.hasOwnProperty(key)) {
          //console.dir(key);
          //console.log("->");
          console.dir(_res[key]);
        }
      }*/

      var _cats = _res.Categorys;

      _cats.forEach(function (category,index) {
        if(index < 20) {
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
        }
        //console.log(category.CategoryName);
        //console.log(category.CategoryID);
      });

    }
  });
};


_createListing();
