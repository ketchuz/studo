app = angular.module 'studo'

app.directive 'quizVerbDirective', [ '$animate', '$compile', ($animate, $compile) ->

	watchers = {}

	restrict: 'A'
	link: (scope, element, attrs) ->
		watchers[scope.$id] && watchers[scope.$id]()

		watchers[scope.$id] = scope.$watch attrs.quizVerbDirective, (newValue, oldValue) ->
			if newValue != oldValue
				$animate.enter $compile(element.clone())(scope),
				element.parent(), element
				element.html oldValue
				$animate.leave	element
]