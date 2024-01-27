const express=require('express');
const slider=require("../models/slider")
const routes=express.Router();
const slidercontroller=require("../controller/sliderController");

routes.get("/add_slider",slidercontroller.add_slider);
routes.post("/insertsliderdata",slider.slideruploadImage,slidercontroller.insertsliderdata)
routes.get("/view_slider",slider.slideruploadImage,slidercontroller.view_slider);
routes.get("/setactive/:id",slidercontroller.setactive);
routes.get("/setDeactive/:id",slidercontroller.setDeactive);
routes.get("/deletedata/:id",slidercontroller.deletedata);
routes.get("/updatedata/:id",slidercontroller.updatedata);
routes.post("/updatesliderdata",slider.slideruploadImage,slidercontroller.updatesliderdata)

module.exports=routes;