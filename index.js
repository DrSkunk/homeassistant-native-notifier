const restify = require('restify');
const notifier = require('node-notifier');
const errs = require('restify-errors');

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.get('/homeassistant', (req, res, next) => {
  let { title, message } = req.query;
  if (!message) {
    message = 'message from homeassistant';
    res.send(304);
    console.log('invalid request');
    return next(
      new errs.InvalidArgumentError(
        "You must supply 'message' as url parameter"
      )
    );
  }
  if (!title) {
    notifier.notify(message);
    console.log('Sending notification', message);
  } else {
    notifier.notify({
      title,
      message
    });
    console.log('Sending notification', {
      title,
      message
    });
  }

  res.send(200);
  next();
});

server.listen(9305, function() {
  console.log('%s listening at %s', server.name, server.url);
});
