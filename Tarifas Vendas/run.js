const soap = require('soap')
var fs = require("fs"),
xml2js = require('xml2js'),
  parseString = require("xml2js").parseString;
'use strict';
const url = 'http://192.168.100.187/soap-wsdl/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC?wsdl'
// var xmlaux;
// var objKeys  = []
// var cle = {
//     key:'BPCNUM',
//     value:'AO001'
// }
// objKeys = cle

var cliente = {
    codeLang: 'POR',
    poolAlias: 'SEED',
    poolId:'',
    resquestConfig: 'adxwss.trace.on=on&adxwss.trace.size=16384&adonix.trace.on=on&adonix.trace.level=3&adonix.trace.size=8&adxwss.optreturn=JSON'
}

soap.createClient(url,(err,client) => {
    if(err){
        console.log(err)
    }else{
        console.log('ok')
        client.setSecurity(new soap.BasicAuthSecurity('ws','intcorax3'))
       
        fs.readFile("inputXml.xml","utf-8", function(err, data) {
            if (err) console.log(err);
          parseString(data, function(err, result) {
              if (err) console.log(err);
              //console.log(result)
              var builder = new xml2js.Builder();
              var xml = builder.buildObject(result);
              //console.log(xml)  
              var args = {
    
                callContext: cliente,
                publicName: 'YTAR_VENDA',
                inputXml: xml
            }
                
                client.run(args, function(err,xml){
                var build = new xml2js.Builder();
                var format = build.buildObject(xml.runReturn.resultXml);
                console.log(format)
            });
          });
          
       

        
        })        
    }
})
