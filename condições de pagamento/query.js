const soap = require('soap')
xml2js = require('xml2js')
const url = 'http://192.168.100.187/soap-wsdl/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC?wsdl'


var objKeys  = [{
    key:'PTE',
    value:'20PCTDOWN'
},
{
    key:'LEG',
    value:'USA'    
}]

var cliente = {
    codeLang: 'POR',
    poolAlias: 'SEED',
    poolId:'',
    resquestConfig: 'adxwss.trace.on=on&adxwss.trace.size=16384&adonix.trace.on=on&adonix.trace.level=3&adonix.trace.size=8&adxwss.optreturn=XML'
}
var args = {
    callContext: cliente,
    publicName: 'YTPT', 
     objectKeys: objKeys,
     listSize: 10
}
soap.createClient(url,(err,client) => {
    if(err){
        console.log(err)
    }else{
        console.log('ok')
        client.setSecurity(new soap.BasicAuthSecurity('ws','intcorax3'))
        client.query(args, function(err,result){
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(result.queryReturn.resultXml);
        console.log(xml)
        })        
    }
})
