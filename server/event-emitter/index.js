var EventEmitter = function () {
	this.handlers = []
};

EventEmitter.prototype.emit = function(type, payload) {
	var argsToApply = [].slice.call(arguments, 1);
	this.handlers.forEach(function(current){
		if (current.eventName === type){
			current.thingToDo.apply(null, argsToApply)
		}
	})
	// body...
};
EventEmitter.prototype.on = function(thisEvent, funk) {
	this.handlers.push({eventName: thisEvent, thingToDo:funk })
};
EventEmitter.prototype.removeListener = function(thisEvent) {
	var handlers = this.handlers;
	for (var i = handlers.length-1; i >=0; i--){
		if (handlers[i].eventName === thisEvent){
			handlers[i].eventName = null;
			handlers[i].thingToDo = null;
			break;
		}
	}
};

module.exports = EventEmitter;