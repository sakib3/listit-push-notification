var constants = require('../constants/constants.json');
var registerFunction = require('../functions/register');
var sendFunction = require('../functions/send-message');
module.exports = function(app, io){

  io.on('connection', function(socket){
    console.log("Client Connected");
  });

  app.get('/', function(req,res){
    res.send({message: 'Success'});
  });

  app.post('/devices',function(req,res) {
    console.log(req.body);
		var deviceName = req.body.deviceName;
		var deviceId   = req.body.deviceId;
		var registrationId = req.body.registrationId;

		if ( typeof deviceName  == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId  == 'undefined' ) {

			console.log(constants.error.msg_invalid_param.message);
			res.json(constants.error.msg_invalid_param);

		} else if ( !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) {

			console.log(constants.error.msg_empty_param.message);
			res.json(constants.error.msg_empty_param);

		} else {
			registerFunction.register( deviceName, deviceId, registrationId, function(result) {

				res.json(result);
				if (result.result != 'error'){
		        io.emit('update', { message: 'New Device Added',update:true});
				}

			});
		}
	});

  app.post('/send',function(req,res){

  var message = req.body.message;
  var registrationId = req.body.registrationId;

    sendFunction.sendMessage(message,registrationId,function(result){

      res.json(result);
    });
  });

}
