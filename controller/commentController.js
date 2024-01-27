const comment = require('../models/comment');
module.exports.view_comment=async(req,res)=>{
    let commentdata = await comment.find({}).populate('postId').exec();
    return res.render("view_comment",{
        cp : commentdata
    })
}