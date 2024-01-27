const blog = require("../models/blog")
const path = require('path');
const fs = require('fs')
module.exports.add_blog = async(req,res)=>{
    return res.render('add_blog');
}
module.exports.insertblogdata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);

    var imgpath = '';
    if(req.file)
    {
        imgpath = blog.blogpath+"/"+req.file.filename;
    }
    req.body.blog_image=imgpath;
    req.body.isActive=true;
    req.body.username = req.user.name
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let blogData = await blog.create(req.body);
    return res.redirect('back');
}

module.exports.view_blog=async(req,res)=>{

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
    let blogdata = await blog.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await blog.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var blogrecord=req.cookies.blog;
    return res.render("view_blog",{
        blogdata : blogdata,
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
        let activedata = await blog.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await blog.findByIdAndUpdate(req.params.id,{isActive:true});
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
    let oldData = await blog.findById(req.params.id);
    if(oldData.blog_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.blog_image);
       await fs.unlinkSync(fullpath);
    }
    await blog.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let blogupdatedata = await blog.findById(req.params.id);
    // console.log(blogupdatedata);
   
    // var blogrecord=req.cookies.admin;
    return res.render('update_blog',{
        budata : blogupdatedata
    })
}

module.exports.updateblogdata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   try
    {
        if(req.file)
        {
            let oldblogdata = await blog.findByIdAndUpdate(req.body.EditId);
            console.log(oldblogdata);
        
            if(oldblogdata.blog_image)
                {
                    let full=path.join(__dirname,"..",oldblogdata.blog_image);
                    await fs.unlinkSync(full);
                }
                req.body.name = req.body.fname+" "+req.body.lname;
                var imagepath ='';
                imagepath = blog.blogpath+"/"+req.file.filename;
                req.body.blog_image=imagepath;
        
            await blog.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_blog' ) 
        }
        else
        {
            let oldimage = await blog.findByIdAndUpdate(req.body.EditId);
            console.log(oldimage);
            req.body.blog_image=oldimage.blog_image;
            await blog.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_blog')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back")
    }
   
}



