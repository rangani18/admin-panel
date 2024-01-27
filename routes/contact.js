const express  = require('express')

const routes = express.Router();

const contactController = require('../controller/contactController');

routes.get("/view_contact",contactController.view_contact);
routes.get("/setactive/:id",contactController.setactive);
routes.get("/setDeactive/:id",contactController.setDeactive);
routes.get("/deletedata/:id",contactController.deletedata);

module.exports = routes