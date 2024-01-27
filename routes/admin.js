const express=require('express');
const passport=require('passport')

const admincontroller=require('../controller/adminController');
const Admin=require('../models/admin')


const routes=express.Router();

routes.get("/", async(req,res)=>{
    // if(req.cookies.admin)
    // {
    //     return res.redirect('/admin/dashboard');
    // }
    console.log('login');
    return res.render('login')
});
routes.get("/dashboard",passport.checkAuthenticattion,admincontroller.dashboard);

routes.get("/add_admin",passport.checkAuthenticattion,admincontroller.add_admin);
routes.get("/view_admin",passport.checkAuthenticattion,admincontroller.view_admin);
routes.post("/insertAdmindata",Admin.AdminuploadImage,admincontroller.insertAdmindata);
routes.get("/setDeactive/:id",admincontroller.setDeactive);
routes.get("/setactive/:id",admincontroller.setactive);

routes.post("/chekLogin",passport.authenticate('local',{failureRedirect:"/admin/"}),admincontroller.chekLogin);
routes.get("/deletedata/:id",passport.checkAuthenticattion,admincontroller.deletedata);
routes.get("/updatedata/:id",admincontroller.updatedata);
routes.post("/updateadmin",Admin.AdminuploadImage,admincontroller.updateadmin);


routes.get("/changePassword",admincontroller.changePassword);
routes.post("/modifypassword",admincontroller.modifypassword);

routes.get("/profile",admincontroller.profile);
// routes.get("/editprofile/:id",admincontroller.editprofile)
// routes.post("/edpersonal",Admin.AdminuploadImage,admincontroller.edpersonal)


//forgot password

routes.get("/mailpage",async(req,res)=>{
    return res.render('forgotpass/emailpage')
})

routes.post("/chekemail",admincontroller.chekemail);

routes.get("/otppage",async(req,res)=>{
    return res.render('forgotpass/otppage')
})

routes.get("/resetpass",async(req,res)=>{
    return res.render("forgotpass/resetpass")
});

routes.post("/chekotp",admincontroller.chekotp);

routes.post("/verifypass",admincontroller.verifypass);

routes.post("/deletemanydata",admincontroller.deletemanydata)


//LOGOUT
routes.get("/logout",async(req,res)=>{
    res.clearCookie('admin')
    return res.redirect('/admin/');
});


routes.use('/slider',passport.checkAuthenticattion,require("./slider"));
routes.use('/offer',passport.checkAuthenticattion,require("./offer"));
routes.use('/review',passport.checkAuthenticattion,require("./review"));
routes.use('/recentphoto',passport.checkAuthenticattion,require("./recentphoto"));
routes.use('/blog',passport.checkAuthenticattion,require("./blog"));
routes.use('/category',passport.checkAuthenticattion,require("./category"));
routes.use("/sub_category",passport.checkAuthenticattion,require("./sub_category"))
routes.use("/contact",passport.checkAuthenticattion,require("./contact"))

module.exports=routes;
