var router = require('director');

/* GET home page. */
router.get('/', function (req, res, next) {
    'use strict';
    res.send('here is my test response');
});

module.exports = router;
