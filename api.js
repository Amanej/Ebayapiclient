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

var authToken = "AgAAAA**AQAAAA**aAAAAA**gr6rVw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4GjCpeEqAmdj6x9nY+seQ**QegDAA**AAMAAA**29BwxipzitZxdgqHTDGSjco1rxKhb75Lj8LUwMJsLcMnrpP2egY9Mf41mALPY+Dow1PWrsJVZa8M6ImqnZP6S+bbjC5la5DmDKaagL6jmp8zDsyDoMHIdG3PFgTl35vBXCp1wOHN6B6GP9361f9FEHlx2M+P9tUh0kZ6n4KnC1RWeYsmfifKtClCZkZlk5ooxqp3tO5fftMx6Vk6+uDwqYnkND96LnAIRiw9SxnXliRpNnyPuSdEQyPypCFwI0kanwnA+MLQRzJiRaUtCikiuJRJuAhaOPEVCN+5ydtIPLJ3GbUGsS7P0L1KFI0z/qXCBaKdTKQ/SBFRb7XWGeIblarH9SpLHqcbFnqyXWYmDsxPm47j67bEh53bGuFZJ4LQjU/WSB+bcR2jEeEtP8ukEqbjOyoz7yyWATsPC/gA9cUzIq0X/bNVP3eGbNJZ8WwOag6tzhgPWljSeGzi7kTqqAvudDhXpKJcs0SFcepRtHu/aEkR4wiO7F5ow98bEz79DMZYB1JtmOuV6o9CILYYaEDRPZ5DgBbiifm9+3Y9Vl9j5tB5+TgvLMIVA29clVVLEA6M6q/gZXOaPuvfsdNtME6QnHobbYwKGGgKMQc80eUjuX+mI+3mWKfsygR1gCYxtdTjHdTcT4/87mBhvXhdLln4JqKd+DoDl6YGlD1zyPZfB6FLNj+gdlnfx1djB741ysQSBmy7l7JykJR49AUQ9/pgc75rIoLJlLry0JGzhbq7GPHo4NIdiLILMSXm256A";

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


_getCategories();
