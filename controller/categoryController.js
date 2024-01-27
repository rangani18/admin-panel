const category = require("../models/category")

module.exports.view_category = async(req,res)=>{
    return res.render('view_category')
}
module.exports.add_category = async(req,res)=>{
    return res.render('add_category')
}
module.exports.wrok_3columns = async(req,res)=>{
    return res.render('userpanel/user_header/work_3columns')
}

module.exports.insertcategorydata = async(req,res)=>{
    console.log(req.body);
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let categoryData = await category.create(req.body);
    return res.redirect('back')
}
module.exports.view_category=async(req,res)=>{

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
    let categorydata = await category.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await category.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var categoryrecord=req.cookies.category;
    return res.render("view_category",{
        categorydata : categorydata,
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
        let activedata = await category.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await category.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await category.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let categoryupdatedata = await category.findById(req.params.id);
    // console.log(categoryupdatedata);
   
    // var categoryrecord=req.cookies.admin;
    return res.render('update_category',{
        catdata : categoryupdatedata
    })
}

module.exports.updatecategorydata= async(req,res)=>{
    // console.log(req.body);
   try
    {
        if(req.body)
        {
            let oldcategorydata = await category.findByIdAndUpdate(req.body.EditId);
            console.log(oldcategorydata);
        
            await category.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_category' ) 
        }
        else
        {
            await category.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_category')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
   
}



