const express = require('express')

const routes = express.Router()

const reviewcontroller = require("../controller/reviewController");

routes.get("/add_review",reviewcontroller.add_review)

routes.post("/insertreviewdata",reviewcontroller.insertreviewdata);

routes.get("/view_review",reviewcontroller.view_review);
routes.get("/setactive/:id",reviewcontroller.setactive);
routes.get("/setDeactive/:id",reviewcontroller.setDeactive);
routes.get("/deletedata/:id",reviewcontroller.deletedata);
routes.get("/updatedata/:id",reviewcontroller.updatedata);
routes.post("/updatereviewdata",reviewcontroller.updatereviewdata)

module.exports = routes;