var express = require('express');
var router = express.Router();

/* GET users listing. */
var pets = ['hellhound', 'displacer beast', 'hydra'];
router.get('/', function(req, res, next) {
  res.render('pets', {title: 'Pets', pets: pets});
});

module.exports = router;
