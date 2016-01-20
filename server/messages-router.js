var express = require('express');
var router = express.Router();
var User = require('./models/user-model');
var Message = require('./models/message-model');

router.get("/to/:recipientId", function (req, res, next) {
	Message.find({to:req.params.recipientId}).populate("to from").exec()
	.then(function(messages){
		res.status(200).json(messages);
	}).then(null, next)
})

router.get("/from/:senderId", function (req, res, next) {
	Message.getAllWhereSender(req.params.senderId)
	.then(function(messages){
		res.status(200).json(messages);
	}).then(null, next);
})

router.post("/", function(req, res, next){
	var message = new Message(req.body);
	message.save()
	.then(function(newMessage){
		res.status(201).json(newMessage)
	}).then(null, next);
})

module.exports = router;