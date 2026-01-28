const router = require('express').Router();
// const router = express();
const {homeRouteFunc} = require('../controller/home.js');
router.route('/').get(homeRouteFunc);

module.exports = router;