const soap = require('soap')
'use strict';
const url = 'http://192.168.100.187/soap-wsdl/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC?wsdl'

var objKeys  = []
var cle = {
    key:'BPCNUM',
    value:'AO001'
}
objKeys = cle
var fs = require('fs');

fs.readFile( 'ex1.xml', function(err, data) {
    console.log(data)
});


var xml = "<GRP ID=BPRC_1><FLD NAME=BPRNAM TYPE=Char>New Name</FLD><FLD NAME=CRY TYPE=Char>US</FLD></GRP>"
//var xml = "<![CDATA[<PARAM><GRP ID=BPRC_1><FLD NAME=BPRNAM TYPE=Char>New Name</FLD><FLD NAME=CRY TYPE=Char>US</FLD></GRP></PARAM>]]>"
// parseString(xml, function (err, result) {
//     console.dir(result);
// });




let rawdata = fs.readFileSync('ex1.json');
let student = JSON.parse(rawdata);
// console.log(student);

var mudarXML =  auxXml = "{"+"BPRC_1"+":"+"{"+"BPRNAM +"+":"+"New Name"+","+ "CRY"+":"+"US"+"}"+"}"



auxml =   {
    "BPRC_1":{"BPRNAM":"New Name", "CRY":"US"}
}

var cliente = {
    codeLang: 'POR',
    poolAlias: 'SEED',
    poolId:'',
    resquestConfig: 'adxwss.trace.on=on&adxwss.trace.size=16384&adonix.trace.on=on&adonix.trace.level=3&adonix.trace.size=8&adxwss.optreturn=JSON'
}
var args = {
    callContext: cliente,
    publicName: 'BPC',
    objectKeys: '',
    objectXml: student
}




soap.createClient(url,(err,client) => {
    if(err){
        console.log(err)
    }else{
        console.log('ok')
        client.setSecurity(new soap.BasicAuthSecurity('ws','intcorax3'))
        client.modify(args, function(err,result){
        console.log(result.modifyReturn.attributes)

        
        })        
    }
})

// xmlEnvio =0 <<<EOD
// <PARAM>
// 	<GRP ID="BPRC_1" >
// 		<FLD NAME="BPRSHO" TYPE="Char" >Editado</FLD>
// 	</GRP>
// </PARAM>
// EOD;



// <wsdl:part name="callContext" type="wss:CAdxCallContext"/>
// <wsdl:part name="publicName" type="xsd:string"/>
// <wsdl:part name="objectKeys" type="wss:ArrayOfCAdxParamKeyValue"/>
// <wsdl:part name="objectXml" type="xsd:string"/>
