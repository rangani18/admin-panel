const express = require('express');

const routes = express.Router();

const blogController = require("../controller/blogController");
const blog = require('../models/blog');

routes.get("/add_blog",blogController.add_blog)

routes.post("/insertblogdata",blog.bloguploadImage,blogController.insertblogdata);

routes.use("/comment",require('./comment'));

routes.get("/view_blog",blog.bloguploadImage,blogController.view_blog);
routes.get("/setactive/:id",blogController.setactive);
routes.get("/setDeactive/:id",blogController.setDeactive);
routes.get("/deletedata/:id",blogController.deletedata);
routes.get("/updatedata/:id",blogController.updatedata);
routes.post("/updateblogdata",blog.bloguploadImage,blogController.updateblogdata)

module.exports = routes;