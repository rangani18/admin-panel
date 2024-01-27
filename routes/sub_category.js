const express = require("express")

const routes = express.Router();

const sub_categoryController = require("../controller/sub_categoryController");
const sub_category = require("../models/sub_category");

routes.get("/add_subcategory",sub_categoryController.add_subcategory);

routes.post("/insertsubcategorydata",sub_category.sub_categoryuploadImage,sub_categoryController.insertsubcategorydata)

routes.get("/view_subcategory",sub_category.sub_categoryuploadImage,sub_categoryController.view_sub_category);
routes.get("/setactive/:id",sub_categoryController.setactive);
routes.get("/setDeactive/:id",sub_categoryController.setDeactive);
routes.get("/deletedata/:id",sub_categoryController.deletedata);
routes.get("/updatedata/:id",sub_categoryController.updatedata);
routes.post("/updatesub_categorydata",sub_category.sub_categoryuploadImage,sub_categoryController.updatesub_categorydata)



module.exports = routes;