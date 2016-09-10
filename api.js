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
};

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
      /*console.dir(_res);*/
      var stringified = JSON.stringify(_res,null,4);

      // Write fs
      /*fs.writeFile("categories.txt",stringified, function(error) {
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
      var _catsLevel1 = [];
      var _catsLevel2 = [];
      var _catsLevel3 = [];
      var _catsLevel4 = [];
      var _catsLevel5 = [];

      _cats.forEach(function (category,index) {
        if(index < 200) {
          //console.log("Index: "+index);
          //console.log("Category name: "+category.CategoryName);
          //console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          //console.log("Durations: "+category.ListingDurations);
        }
        if(category.CategoryLevel === "1") {
          console.log("This is a level 1 category");
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
          _catsLevel1.push(category.CategoryID);
        } else if(category.CategoryLevel === "2") {
          console.log("This is a level 2 category");
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
          _catsLevel2.push(category.CategoryID);
        } else if(category.CategoryLevel === "3") {
          console.log("This is a level 3 category");
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
          _catsLevel3.push(category.CategoryID);
        } else if(category.CategoryLevel === "4") {
          console.log("This is a level 4 category");
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
          _catsLevel4.push(category.CategoryID);
        } else if(category.CategoryLevel === "5") {
          console.log("This is a level 5 category");
          console.log("Index: "+index);
          console.log("Category name: "+category.CategoryName);
          console.log("Category id: "+category.CategoryID);
          console.log("Category level: "+category.CategoryLevel);
          console.log("Durations: "+category.ListingDurations);
          _catsLevel5.push(category.CategoryID);
        }
        //console.log(category.CategoryName);
        //console.log(category.CategoryID);
      });

      console.log("Level 1 categories");
      console.dir(_catsLevel1);

      console.log("Level 2 categories");
      console.dir(_catsLevel2);

      console.log("Level 3 categories");
      console.dir(_catsLevel3);

      console.log("Level 4 categories");
      console.dir(_catsLevel4);

      console.log("Level 5 categories");
      console.dir(_catsLevel5);

      // Write files to seperate text files
      fs.writeFile("categories_1.txt",_catsLevel1, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });

      fs.writeFile("categories_4.txt",_catsLevel4, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });

      fs.writeFile("categories_5.txt",_catsLevel5, function(error) {
        if(error) {
          console.log(error);
        }

        console.log("File was saved");
      });


    }
  });
};

var _GeteBayDetails = function() {
  var params = {
    DetailName: "ShippingServiceDetails"
  };

  ebay.xmlRequest({
      serviceName: "Trading",
      opType: "GeteBayDetails",

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
      console.log(err);
    } else {
      //console.log(res);
      //console.log(res);
      var _res = res;
      console.dir(_res);
      // ListingDurations

      var stringified = JSON.stringify(_res,null,4);
      console.log(stringified);
      // Write fs
      /*fs.writeFile("testFeatures.txt",stringified, function(error) {
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
    }
  });
};

//_getCategories();

//_getCategoryDuration("162951");

//_GeteBayDetails();

var _createListing = function() {
  var data = {
    //categoryId: "48749",
    //categoryId: "162951",
    categoryId: "106368",
    price: "24.99"
  };
  var Item = {
    "Title": "Pokemon Low Poly",
    "Description": "<h1>This is an awesome pokemon product</h1>Buy it now.",
    "PaymentMethods": "Paypal",
    "PaymentMethods": "CreditCard",
    "PayPalEmailAddress": "kontakt@tegningtil3d.no",
    //"PrimaryCategory": "164808",
    "PrimaryCategory.CategoryID": data.categoryId,
    "StartPrice": data.price,
    "Site": "US",
    "ListingDuration": "Days_30",
    "ListingType": "FixedPriceItem",
    "Location": "Oslo, Norway",
    "Country": "NO",
    "Currency": "USD",
    "InternationalShippingServiceOptionsType": {
      "ImportCharge": "",
      "ShippinginsuranceCost": "",
      "ShippingService": "",
      "ShippingServiceCost": "",
      "ShippingServicePriority": "",
      "ShipToLocation": ""
    }
  };
  var params = {
    Item: Item
  };
  console.log("ListingDuration: "+Item.ListingDuration);
  console.log("Categoryid: "+data.categoryId);

  ebay.xmlRequest({
      serviceName: "Trading",
      opType: "VerifyAddItem",

      // Authentication
      devId: _devId,
      certId: _certId,
      appName: apiId,
      sandbox: true,

      authToken: authToken,

      params: params,
      parser: ebay.parseResponseJson,

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


    }
  });
};

_createListing();
