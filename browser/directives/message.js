app.directive('message', function ($state) {
	return {
		restrict: "E",
		templateUrl: "browser/directives/message.html",
		scope: {
			emailMessage: '='
		},
		link: function(scope, element, attribute){
			scope.goToMessageState = function(){
				$state.go('messageView',{id:scope.emailMessage._id});
			}
		}
	}
});