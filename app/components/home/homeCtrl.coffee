app = angular.module 'studo'

app.controller 'HomeCtrl', [ '$scope', '$location', ($scope, $location) ->
	
	$ ->
		$('[data-toggle="tooltip"').hover ->
			$(this).tooltip('show')
		,() -> 
			$(this).tooltip('hide')

	$scope.GoToAll = (section) ->
		$location.path '/' + section + '/all'

	$scope.GoToNew = (section) ->
		$location.path '/' + section + '/new'

	$scope.GoToImprove = (section) ->
		$location.path '/' + section + '/improve'

	$scope.items = [
			title: 'Verbs'
			description: "In this section you will be able to play the verbs you know so far. Not only can you revise its infinitive form but also it's most common future and past form."
			icon: 'fa fa-bicycle'
			img: 'http://ep1.pinkbike.org/p5pb7291062/p5pb7291062.jpg'
			order: 'first',
			section: 'verbs'
		,
			title: 'Nouns'
			description: "You might know the rule but...  do you know the gender? Was it 'das', or 'die'? Play this section to help you remember which gender the noun is."
			icon: 'fa fa-cubes'
			img: 'http://www.desktopdress.com/desktopwallpapers/3d/orange-cube-boxes.jpg'
			order: 'second',
			section: 'nouns'
		,
			title: 'Adjectives'
			description: 'Beautify your speech. Adjectives are a fundamental and beautiful part of any language. The more you know, the easier you will be able to express what you think.'
			icon: 'fa fa-heart'
			img: 'http://dpshots.com/images/selective_coloring/umbrella_lake.jpg'
			order: 'third',
			section: 'adjectives'
	] 

]