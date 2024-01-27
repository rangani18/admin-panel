const recent = require("../models/recentphoto")
const path = require('path');
const fs = require('fs');
module.exports.add_recentphoto = async(req,res)=>{
    return res.render("add_recentphoto");
}
module.exports.insertrecentdata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);

    var imgpath = '';
    if(req.file)
    {
        imgpath = recent.recentpath+"/"+req.file.filename;
    }
    req.body.recent_image=imgpath;
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let recentData = await recent.create(req.body);
    return res.redirect('back');
}

module.exports.view_recentphoto=async(req,res)=>{

    let search=''
    if(req.query.search)
    {
        search=req.query.search;
    }
    // console.log(search)
    if(req.query.page)
    {
        page = req.query.page
    }
    else{
        page = 0 
    }
    var perpage = 3;
    let recentphotodata = await recent.find({
        $or : [
            {"name" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await recent.find({
        $or : [
            {"name" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var recentphotorecord=req.cookies.recentphoto;
    return res.render("view_recentphoto",{
        recentphotodata : recentphotodata,
        search : search,
        totaldocument : Math.ceil(totaldocument/perpage),
        currentpage : page 
    })
}


module.exports.setDeactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await recent.findByIdAndUpdate(req.params.id,{isActive:false});
        if(activedata)
        {
            console.log("success");
            return res.redirect("back")
        }
        else{
            console.log("record not deactive");
            return res.redirect("back")
        }
    }
    else{
        console.log("record not found");
        return res.redirect("back")
    }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.setactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await recent.findByIdAndUpdate(req.params.id,{isActive:true});
        if(activedata)
        {
            console.log("success");
            return res.redirect("back")
        }
        else{
            console.log("record not deactive");
            return res.redirect("back")
        }
    }
    else{
        console.log("record not found");
        return res.redirect("back")
    }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.deletedata = async(req,res)=>{
    console.log(req.params.id);
    let oldData = await recent.findById(req.params.id);
    if(oldData.recentphoto_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.recentphoto_image);
       await fs.unlinkSync(fullpath);
    }
    await recent.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let recentphotoupdatedata = await recent.findById(req.params.id);
    // console.log(recentphotoupdatedata);
   
    // var recentphotorecord=req.cookies.admin;
    return res.render('update_recentphoto',{
        reudata : recentphotoupdatedata
    })
}

module.exports.updaterecentphotodata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   try
    {
        if(req.file)
        {
            let oldrecentphotodata = await recent.findByIdAndUpdate(req.body.EditId);
            console.log(oldrecentphotodata);
        
            if(oldrecentphotodata.recent_image)
                {
                    let full=path.join(__dirname,"..",oldrecentphotodata.recent_image);
                    await fs.unlinkSync(full);
                }
                req.body.name = req.body.fname+" "+req.body.lname;
                var imagepath ='';
                imagepath = recent.recentphotopath+"/"+req.file.filename;
                req.body.recent_image=imagepath;
        
            await recent.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_recentphoto' ) 
        }
        else
        {
            let oldimage = await recent.findByIdAndUpdate(req.body.EditId);
            console.log(oldimage);
            req.body.recent_image=oldimage.recent_image;
            await recent.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_recentphoto')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back")
    }
   
}