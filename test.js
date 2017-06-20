/* 
This file is : server/src/routes/test.js
Add the below api in the url and it should work
*/

router.post('/findOnlyQuestionsByQuery',function(req,res){
    // console.log(req.body);
    findQuestionsByQuery(req.body)
        .then(function(doc) {
            res.status(200).send(doc);
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({
                err: err.message
            });
        })
});


function findQuestionsByQuery(data) {

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].length > 0) {
                    data[key] = {
                        $in: data[key]
                    }
                } else {
                    delete data[key];
                }
            }
        }
        //example : {'publications':{ "$in" :['S1-5MnzX']},'subjects':{ "$in" :['angularjs']}}

        return getConnection().then(dbCollection).then(find).catch(globalFunctions.err);

        function find(col) {
            return col.find(data,{key:0}).toArray();  // Here instead of key we can exclude the field which we dont want
        }
    }
	
function dbCollection(db) {
    return db.collection('practiceQuestions');
}