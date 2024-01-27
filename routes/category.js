const express = require('express');

const routes = express.Router()

const categoryController = require('../controller/categoryController')

routes.get("/view_category",categoryController.view_category);

routes.get("/add_category",categoryController.add_category)

routes.get("/wrok_3columns",categoryController.wrok_3columns);

routes.post("/insertcategorydata",categoryController.insertcategorydata)

routes.get("/view_category",categoryController.view_category);
routes.get("/setactive/:id",categoryController.setactive);
routes.get("/setDeactive/:id",categoryController.setDeactive);
routes.get("/deletedata/:id",categoryController.deletedata);
routes.get("/updatedata/:id",categoryController.updatedata);
routes.post("/updatecategorydata",categoryController.updatecategorydata);

module.exports = routes;