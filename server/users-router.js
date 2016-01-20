var express = require('express');
var router = express.Router();
var User = require('./models/user-model');

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function(users){
		res.status(200).json(users)
	}).then(null, next);
})

router.put('/:usersId', function(req, res, next){
	User.findByIdAndUpdate(req.params.usersId, req.body)
	.exec()
	.then(function(user){
		res.status(201).json(user)
	}).then(null, next);
})

module.exports = router;