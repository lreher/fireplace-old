module.exports = function(tasks, callback){
    var currentIndex = 0,
        results = [],
        complete;

    tasks.forEach(function(task, index){
        task(function(error, result){
            if(complete){
                return;
            }

            results[index] = arguments;

            while(results[currentIndex]){
                if(!results[currentIndex][0]){
                    complete = true;
                    callback.apply(null, results[currentIndex]);
                    return;
                }
                currentIndex++;
            }

            if(error){
                if(currentIndex === tasks.length){
                    callback.apply(null, results[results.length - 1]);
                }

                return;
            }
        });
    });
};