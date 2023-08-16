let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for displaying the LOGIN page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the LOGIN page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the REGISTER page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the REGISTER page */
router.post('/register', indexController.processRegisterPage);

/* GET Route for processing user logout  */
router.get('/logout', indexController.performLogout);

module.exports = router;
