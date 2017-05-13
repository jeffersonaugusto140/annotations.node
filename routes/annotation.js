var express = require('express');
var router = express.Router();
var annotationModel = require('../logic/model/annotationModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  annotationModel.findAll(function(result){
    res.render('annotation', { title: 'Annotation', annotations: result });
  });
});

router.post('/add', function (request, response, next) {
  var body = request.body;

  annotationModel.add(body);
  
  response.redirect('/');
});

router.get('/remove/:id', function(request, response, next) {
  var id = request.params.id;
  annotationModel.remove(id, function () {
    response.redirect('/');
  });
});

module.exports = router;
