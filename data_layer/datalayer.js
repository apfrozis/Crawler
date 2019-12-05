var Mongo;

const moment = require('moment')

var Database = function(){
	Mongo = require('./mongo');
}

Database.prototype = {

	abstractModel_save :function(input, cb)
    {
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

	},
	saveGame :function(input, cb)
    {
        try
		{
			var abstract = Mongo.game(input);

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

	},
	saveGameHistory :function(input, cb)
    {
        try
		{
			var abstract = Mongo.game_history(input);

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

	},
	findAndUpdateGame : function(input,  next )
	{
		try
		{
		
			var _game =  Mongo.game(input);
			_game.computeKey();

			console.log(_game.game_key );

			let key = {game_key: _game.game_key};

			console.log('game 1', _game.save);
			console.log('game 2', key);

			Mongo.game.findOneAndUpdate(key,  input,{new: true, upsert: true }, (err, doc) => {
				if (err) {
					console.log("Something wrong when updating data!");
					next(err, null);
				}else{
					console.log('Document saved with sucess ', doc);
					next(null, doc);
				}
			});
			
			// _game.findOneAndUpdate({game_key: _game.game_key}, input, {new: true}, (err, doc) => {
			// 	if (err) {
			// 		console.log("Something wrong when updating data!");
			// 		next(err, null);
			// 	}else{
			// 		next(null, doc);
			// 	}
			// });
		}
		catch (err)
		{
			console.error('Error saving model ', err );
			next(err, null)
		}
	},
	findGameByCriteria: function(criteria, next ) {

		try
		{
		
			// var _game =  Mongo.game(input);
			//_game.computeKey();

			//console.log(_game.game_key );
			//let key = {game_key: _game.game_key};

			
			const today = moment(criteria.gameDate).startOf('day')

			let filter = {
				gameDate : {
					$gte: today.toDate(),
					$lte: moment(today).endOf('day').toDate()
				}
			  }

			Mongo.game.find(filter, (err, data)  => 
			{
				if(err){
					next(err, null);
				}
				else{
					next(null, data);
				}
			});
		
		}
		catch (err)
		{
			console.error('Error saving model ', err );
			next(err, null)
		}


	}
    
}




	exports = module.exports =  Database;