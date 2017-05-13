var express = require('express');
var router = express.Router();
var annotationModel = require('../logic/model/annotationModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  annotationModel.findAll(function(result){
    res.render('index', { title: 'Annotation', annotations: result });
  });
});

module.exports = router;
