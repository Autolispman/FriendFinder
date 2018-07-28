const path = require('path')
const routes = require('express').Router();


routes.get('/', (req, res) => {
    console.log(req.url)
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

routes.get('/:page', (req, res) => {
    // console.log(req.params.page)
    let page = req.params.page
    let htmlFile = path.join(__dirname, '../public/home.html')
    if(page === 'survey') {
        htmlFile = path.join(__dirname, '../public/survey.html')
    }
    res.sendFile(htmlFile);
  });

module.exports = routes;

