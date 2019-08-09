var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();
/* GET home page. */
router.get('/', function(req, res, next) {
    var xmlfile = __dirname + "ex1.xml";
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            parser.parseString(text, function (err, result) {
               consoleg.log(result)
            });
        }
   });
});
module.exports = router;