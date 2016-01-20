var Promise = require('es6-promise').Promise;

Promise.map = function (array, funk) {
	return array.map(function(item){
		return new Promise(function(resolve, reject){
			var funk = funk(item)
			resolve(funk)
		})
	})
};



funk(item)