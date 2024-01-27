const express = require('express');

const routes = express.Router();

const offerController = require("../controller/offerController")

routes.get("/add_offer",offerController.add_offer)

routes.post("/insertofferdata",offerController.insertofferdata);

routes.get("/view_offer",offerController.view_offer);
routes.get("/setactive/:id",offerController.setactive);
routes.get("/setDeactive/:id",offerController.setDeactive);
routes.get("/deletedata/:id",offerController.deletedata);
routes.get("/updatedata/:id",offerController.updatedata);
routes.post("/updateofferdata",offerController.updateofferdata)

module.exports = routes;