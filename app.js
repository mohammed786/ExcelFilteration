/*
This file referes to: client/responsive-misc-pages/app.js
Just have to add below block in that file
 */

.state('previous-papers-que',{
				url : "/previous-papers-que/:paper_id",
				template : "<previous-papers-page></previous-papers-page>",
				resolve : {
					loadMyCtrl: ['$q','$ocLazyLoad', function($q,$ocLazyLoad) {
						var defer = $q.defer();
						$ocLazyLoad.toggleWatch(true);
						require(['./practice-demo/questions.js'],function(){
							$ocLazyLoad.inject();
							$ocLazyLoad.toggleWatch(false);
							defer.resolve();
						});
						return defer.promise;
			      	}]
				},
				params : {
                    paper_id : {
                        value: null,
                        squash: true
                    }
                }
			})