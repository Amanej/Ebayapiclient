var ebay = require('ebay-api');

var apiId = "LGPAS-Digible-SBX-4576c9601-e1430a37";

var params = {
  keywords: ["buddha","batman"]
}

ebay.xmlRequest({
  serviceName: 'Finding',
  opType: 'findItemsByKeywords',
  appId: apiId,
  params: params,
  parser: ebay.parseResponseJson,
  sandbox: true
},
 function itemsCallback(err,res) {
   if(err) throw err;

   var items = res.searchResult.item;

   for(var i = 0;i < items.length;i++) {
     //console.log('- ' + items[i].title);
     if(i === 15) {
       console.dir(items[i]);
     }
   }
})
