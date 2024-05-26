var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nltestdb'
})

/* GET teachers listing. */
router.get('/', function(req, res, next) {
  var arr = [];

  connection.query('SELECT DISTINCT(teacher) as teacher from students ORDER BY teacher ASC;', function(err, rows, fields) {
    if (err) res.json(err);
    else{
      for (var i = 0; i < rows.length; i++){
        arr.push(
          rows[i].teacher
        )
        
      }
	  res.set('Access-Control-Allow-Origin', '*');
    res.json(arr);
    }
    
  })
});

module.exports = router;
