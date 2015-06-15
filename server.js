var express = require('express');
var app = express();

app.use(express.static('www'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
});
