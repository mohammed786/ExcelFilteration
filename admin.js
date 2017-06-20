/*
Goto : client/shared/services/admin.js 
Add our own method there to get the filtered questions without explantion
 */
 function admin($http,BASE_API) {
	 this.findOnlyPracticeQuestionsByQuery = function(data){
			return $http.post(BASE_API + '/test/findOnlyQuestionsByQuery',data);
		}
 }