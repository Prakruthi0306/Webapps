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

  connection.query(
      'SELECT AVG(SLPS2) as AverageScreening, AVG(`SLPS2 Baseline Score`) as AverageScreeningBaseline, AVG(`NLL-A`) as AverageAssessment, AVG(`NLL-A Baseline Score`) as AverageAssessmentBaseline, AVG(`NLL-A Change compared to last month`) as AverageAssessmentLastMonth, AVG(`NLL-A Change compared to same month last year`) as AverageAssessmentSameMonthLastYear, AVG(`NLL-A Average change for the past year`) as AverageAssessmentPastYear, AVG(`NLL-I`) as AverageIntervention, AVG(`NLL-I Baseline Score`) as AverageInterventionBaseline, AVG(`NLL-I Change compared to last month`) as AverageInterventionLastMonth, AVG(`NLL-I Change compared to same month last year`) as AverageInterventionSameMonthLastYear, AVG(`NLL-I Average change for the past year`) as AverageInterventionPastYear from children WHERE role = "child/student";', 
      function(err, rows, fields) {
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
