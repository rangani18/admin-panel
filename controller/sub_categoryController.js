const sub_category = require("../models/sub_category")
const path = require('path')
const fs = require('fs')
module.exports.add_subcategory = async(req,res)=>{
    return res.render("add_subcategory")
}
module.exports.insertsubcategorydata = async(req,res)=>{

    // console.log(req.file);
    // console.log(req.body);

    var imgpath = '';
    if(req.file)
    {
        imgpath = sub_category.sub_categorypath+"/"+req.file.filename;
    }
    req.body.sub_category_image=imgpath;
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let sub_categoryData = await sub_category.create(req.body);
       
 
    return res.redirect("back")
}

module.exports.view_sub_category=async(req,res)=>{

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
    let sub_categorydata = await sub_category.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await sub_category.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var sub_categoryrecord=req.cookies.sub_category;
    return res.render("view_sub_category",{
        sub_categorydata : sub_categorydata,
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
        let activedata = await sub_category.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await sub_category.findByIdAndUpdate(req.params.id,{isActive:true});
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
    let oldData = await sub_category.findById(req.params.id);
    if(oldData.sub_category_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.sub_category_image);
       await fs.unlinkSync(fullpath);
    }
    await sub_category.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let sub_categoryupdatedata = await sub_category.findById(req.params.id);
    // console.log(sub_categoryupdatedata);
   
    // var sub_categoryrecord=req.cookies.admin;
    return res.render('updatesub_category',{
        subdata : sub_categoryupdatedata
    })
}

module.exports.updatesub_categorydata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   try
    {
        if(req.file)
        {
            let oldsub_categorydata = await sub_category.findByIdAndUpdate(req.body.EditId);
            // console.log(oldsub_categorydata);
        
            if(oldsub_categorydata.sub_category_image)
                {
                    let full=path.join(__dirname,"..",oldsub_categorydata.sub_category_image);
                    await fs.unlinkSync(full);
                }
                req.body.name = req.body.fname+" "+req.body.lname;
                var imagepath ='';
                imagepath = sub_category.sub_categorypath+"/"+req.file.filename;
                req.body.sub_category_image=imagepath;
        
            await sub_category.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_sub_category' ) 
        }
        else
        {
            let oldimage = await sub_category.findByIdAndUpdate(req.body.EditId);
            // console.log(oldimage);
            req.body.sub_category_image=oldimage.sub_category_image;
            await sub_category.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_sub_category')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back")
    }
   
}



