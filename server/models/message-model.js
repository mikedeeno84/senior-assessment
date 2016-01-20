var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	subject:{
		type: String,
		default: "No Subject"

	},
	body:{
		type: String,
		required: true	
	},
	from:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true	
	},
	to:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true	
	}
});

schema.statics.getAllWhereSender = function (id) {
	var Message = this;
	return Message.find({from:id}).populate("from to").exec()
	.then(null, console.log);
}

schema.methods.truncateSubject = function(n, ellipse){
	var message = this;
	message.subject = message.subject.slice(0,n);
	if (ellipse) message.subject+="..."
	return message;
}


module.exports = mongoose.model('Message', schema);