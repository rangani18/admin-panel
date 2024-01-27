const express=require('express');
const routes=express.Router()
const usercontroller=require("../controller/userController");
const slider = require("../models/slider");
const comment = require('../models/comment');

routes.get("/",usercontroller.start);

routes.get("/blogsingle/:id",usercontroller.blogsingle)

routes.post("/addcomment",comment.commentuploadImage,usercontroller.addcomment)

routes.get("/work_3columns",usercontroller.work_3columns);

routes.get('/contact', async(req,res)=>{
    return res.render('userpanel/contact')
});

routes.post('/insertcontactdata',usercontroller.insertcontactdata);

module.exports=routes;