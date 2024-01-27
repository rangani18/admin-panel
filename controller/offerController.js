const offer = require("../models/offer")
module.exports.add_offer = async(req,res)=>{
    return res.render("add_offer")
}
module.exports.insertofferdata=async(req,res)=>{
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let offerData = await offer.create(req.body);
    return res.redirect('back');
}

module.exports.view_offer=async(req,res)=>{

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
    let offerdata = await offer.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    })
    .limit(perpage)
    .skip(perpage*page)

    let totaldocument = await offer.find({
        $or : [
            {"title" : {$regex : ".*"+search+".*",$options:"i"}},
            {"description" : {$regex : ".*"+search+".*",$options:"i"}},
        ]
    }).countDocuments()
    // var offerrecord=req.cookies.offer;
    return res.render("view_offer",{
        offerdata : offerdata,
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
        let activedata = await offer.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await offer.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await offer.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let offerupdatedata = await offer.findById(req.params.id);
    // console.log(offerupdatedata);
   
    // var offerrecord=req.cookies.admin;
    return res.render('update_offer',{
        oudata : offerupdatedata
    })
}

module.exports.updateofferdata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   try
    {
        if(req.body)
        {
            let oldofferdata = await offer.findByIdAndUpdate(req.body.EditId);
            console.log(oldofferdata);
        
            await offer.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_offer' ) 
        }
        else
        {
            await offer.findByIdAndUpdate(req.body.EditId,req.body)
            return res.redirect('view_offer')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back")
    }
   
}



