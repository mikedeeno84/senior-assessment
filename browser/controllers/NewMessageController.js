app.controller('NewMessageController', function ($scope, MessagesFactory) {
	$scope.messages = [];
	$scope.submitMessage = function(){
		MessagesFactory.sendMessage($scope.currentMessage)
		.then(function(newMessage){
			$scope.messages.push(newMessage);
		}).then(null, console.log);
	}
});