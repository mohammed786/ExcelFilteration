/* Steps to follow for creating a page :

Starting point of the app is : client/responsive-misc-pages/previous-papers/previous-papers.component.js

Whole list of questions are fetched in the block of code:  */

require('service.admin'); // this line will add service admin in the code 
require('directive.headerMenu');
require('./_previous-papers.scss');

// This code will add the module  in angular app
angular.module(window.moduleName)
    .component('previousPapersPage', {
        template: ['$element', '$attrs',
            function($element, $attrs) {
                return require('./questions.html');
            }
        ],
        controller: TrainingModulesController,
        controllerAs: 'vm'
    })

// This line will inject "admin" in the controller 
TrainingModulesController.$inject = ['$filter', '$state', '$q','$window','$scope','$sce',"$stateParams", 'admin'];  

function TrainingModulesController($filter, $state, $q,$window,$scope,$sce,$stateParams, admin) {
	var vm = this; // it is a reference name of 'TrainingModulesController'
	
	function getQuestions(){
			// Here the query will have all the ID of the questions get it from console
			var query = {
				questionId : vm.totalQuestions
			}
			vm.isQuestionLoading = true;
			admin.findOnlyPracticeQuestionsByQuery(query)    // This line called for getting the questions from API it calls the fuction of admin service
				.then(function(res){
					vm.isQuestionLoading = false;
					vm.questions  = res.data
					if(vm.questions && vm.questions.length > 0){
						loadQuestionsToDOM();
					}
				})
				.catch(function(err) {
					console.log(err)
				})
		}
	
}