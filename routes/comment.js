const express = require('express')
const routes = express.Router();
const commentController = require('../controller/commentController')
const comment = require("../models/comment");

routes.get("/view_comment",commentController.view_comment);

module.exports=routes;