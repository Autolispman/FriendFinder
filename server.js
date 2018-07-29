const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const htmlRoutes = require('./app/routing/htmlRoutes')
const apiRoutes = require('./app/routing/apiRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

console.log(path.join(__dirname +'/app/'))
app.use(express.static(path.join(__dirname, '/app/public')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', htmlRoutes);
app.use('/', apiRoutes);
console.log(__dirname)


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  