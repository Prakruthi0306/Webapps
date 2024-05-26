var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'newnltestdb'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  var arr = [];

  connection.query('SELECT * from subjects WHERE role = "child/student" LIMIT 100;', function(err, rows, fields) {
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
    
  })
});

module.exports = router;
