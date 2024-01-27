const review = require("../models/review");
const path = require("path");

module.exports.add_review = async(req,res)=>{
    return res.render("add_review")
}

module.exports.insertreviewdata = async(req,res)=>{
    try{
        console.log(req.body);
        req.body.isActive=true;
        req.body.created_date=new Date().toLocaleDateString();
        req.body.updated_date=new Date().toLocaleDateString();
        let reviewdata = await review.create(req.body);
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}

module.exports.view_review=async(req,res)=>{

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
    let reviewdata = await review.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await review.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var reviewrecord=req.cookies.review;
    return res.render("view_review",{
        reviewdata : reviewdata,
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
        let activedata = await review.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await review.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await review.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let reviewupdatedata = await review.findById(req.params.id);
    // console.log(reviewupdatedata);
   
    // var reviewrecord=req.cookies.admin;
    return res.render('update_review',{
        rudata : reviewupdatedata
    })
}

module.exports.updatereviewdata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   try
    {
        if(req.body)
        {
            let oldreviewdata = await review.findByIdAndUpdate(req.body.EditId);
            console.log(oldreviewdata);
        
            await review.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_review' ) 
        }
        else
        {
            await review.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_review')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back")
    }
   
}



