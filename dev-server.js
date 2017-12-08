const express = require('express');
const serve   = require('express-static');

const app = express();

// middleware to hax file names
app.use((req, res, next) => {
  if (req.url.indexOf('/dist') === 0) {
    req.url += '.js'
  }
  console.log(req.url)
  next()
})

app.use( serve(__dirname) );

const server = app.listen(8080, function(){
  console.log('server is running at %s', server.address().port);
});