app.factory('MessagesFactory', function ($http) {
	var MessagesFactory = {

	}
	MessagesFactory.getMessagesFrom = function(id){
		return $http.get("/messages/from/" + id)
		.then(function(response){
			return response.data;
		});
	}

	MessagesFactory.sendMessage = function(data){
		return $http.post('/messages', data)
		.then(function(response){
			return response.data;
		});
	}
	return MessagesFactory;
});