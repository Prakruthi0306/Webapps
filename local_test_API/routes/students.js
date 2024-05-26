var express = require('express');
var router = express.Router();
const fs = require("fs");
/*var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'childrendb'
})*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*var arr = [];

  connection.query('SELECT * from children WHERE role = "child/student" LIMIT 100;', function(err, rows, fields) {
    if (err) res.json(err);
    else{
      for (var i = 0; i < rows.length; i++){
        arr.push(
          rows[i]
        );
        
      }
	  res.set('Access-Control-Allow-Origin', '*');
    res.json(arr);
    }
    
  })*/
  // Reading the file using default
// fs npm package 

csv = fs.readFileSync("children.csv")
  
// Convert the data to String and
// split it in an array
var array = csv.toString().split("\r");
  
// All the rows of the CSV will be 
// converted to JSON objects which 
// will be added to result in an array
let result = [];
  
// The array[0] contains all the 
// header columns so we store them 
// in headers array
let headers = array[0].split(",")
  
// Since headers are separated, we 
// need to traverse remaining n-1 rows. 
for (let i = 1; i < array.length - 1; i++) {
  let obj = {}
  
  // Create an empty object to later add 
  // values of the current row to it
  // Declare string str as current array
  // value to change the delimiter and 
  // store the generated string in a new
  // string s
  let str = array[i]
  let s = ''
  
  // By Default, we get the comma seprated
  // values of a cell in quotes " " so we 
  // use flag to keep track of quotes and 
  // split the string accordingly
  // If we encounter opening quote (") 
  // then we keep commas as it is otherwise
  // we replace them with pipe |
  // We keep adding the characters we 
  // traverse to a String s
  let flag = 0
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1
    }
    else if (ch === '"' && flag == 1) flag = 0
    if (ch === ',' && flag === 0) ch = '|'
    if (ch !== '"') s += ch
  }
  
  // Split the string using pipe delimiter | 
  // and store the values in a properties array
  let properties = s.split("|")
  
  // For each header, if the value contains
  // multiple comma separated data, then we
  // store it in the form of array otherwise
  // directly the value is stored
  for (let j in headers) {
    /*if (properties[j].includes(",")) {
      obj[headers[j]] = properties[j]
        .split(",").map(item => item.trim())
    }
    else obj[headers[j]] = properties[j]*/
    obj[headers[j]] = properties[j]
  }
  
  // Add the generated object to our
  // result array 
  
  result.push(obj)
}
var final = [];
for (let h in result){
  if (result[h]["Role"] === "child/student"){
    result[h]["sequence"] = h;
    result[h]["Address"] = result[h]["Address"][0] + result[h]["Address"]
    final.push(result[h]);
  }
}
// Convert the resultant array to json and 
// generate the JSON output file.
//let json = JSON.stringify(result);
res.set('Access-Control-Allow-Origin', '*');
res.json(final);

});

module.exports = router;
