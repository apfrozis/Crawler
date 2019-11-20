var Mongo;

var Database = function(){
	Mongo = require('./mongo');
}

Database.prototype.abstractModel_save = function(input, cb)
    {
        console.log('mongo -> ',Mongo );
        try
		{
			var abstract = Mongo.abstatract(input);

			abstract.save()
				.then(function(result)
					{
                        console.log('model was saved with sucess ', result);
						cb(null, result);
					},
					function(err)
					{
                        console.error('error saved model ', err);
						cb(err);
					});
		}
		catch (err)
		{
			cb(err, null)
		}

    }
    


	exports = module.exports =  Database;