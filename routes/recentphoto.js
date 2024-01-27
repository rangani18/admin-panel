const express = require('express');

const routes = express.Router();

const recent = require("../models/recentphoto")

const recentphotoController = require("../controller/recentphotoController")

routes.get("/add_recentphoto",recentphotoController.add_recentphoto);

routes.post("/insertrecentdata",recent.recentuploadImage,recentphotoController.insertrecentdata);

routes.get("/view_recentphoto",recent.recentuploadImage,recentphotoController.view_recentphoto);
routes.get("/setactive/:id",recentphotoController.setactive);
routes.get("/setDeactive/:id",recentphotoController.setDeactive);
routes.get("/deletedata/:id",recentphotoController.deletedata);
routes.get("/updatedata/:id",recentphotoController.updatedata);
routes.post("/updaterecentphotodata",recent.recentuploadImage,recentphotoController.updaterecentphotodata)

module.exports = routes;