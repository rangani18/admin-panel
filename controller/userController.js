const slider=require('../models/slider');
const offer = require('../models/offer')
const review = require('../models/review')
const recent = require('../models/recentphoto')
const blog = require('../models/blog');
const path=require('path');
const comment = require('../models/comment');
const contact = require('../models/contact')
const nodemailer = require('nodemailer')

module.exports.start = async(req,res)=>{
    let sliderdata = await slider.find({});
    let offerdata = await offer.find({});
    let reviewdata = await review.find({});
    let recentphoto = await recent.find({});
    let blogdata = await blog.find({});
    return res.render('userpanel/home',{
        "sliderdata" : sliderdata,
        "offerdata" : offerdata,
        "reviewdata" : reviewdata,
        "recentphoto" : recentphoto,
        "blogdata" : blogdata
    })
}

module.exports.blogsingle = async(req,res)=>{
    let recentPost = await blog.find({}).sort({"_id":-1}).limit(3)
    let blogsingledata = await blog.findById(req.params.id);
    let commentpost = await comment.find({postId:req.params.id})
    let allblogdata = await blog.find({});

    var ids = []
    allblogdata.map((v,i)=>{
        ids.push(v.id);
    });
    var next ;
    for(var i=0; i<ids.length; i++){
        if(ids[i]===req.params.id){
            next=i;
            break;
        }
    }

    return res.render('userpanel/blog-single',{
        singledata :  blogsingledata,
        postId : req.params.id,
        cp : commentpost,
        AllIds : ids,
        nextpage : next,
        recentPost : recentPost
    });
}

module.exports.addcomment = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    var imgpath = '';
    if(req.file)
    {
        imgpath = comment.commentpath+"/"+req.file.filename;
    }
    req.body.commentimage = imgpath;
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let commentdata = await comment.create(req.body);
    return res.redirect('back');
}

module.exports.work_3columns = async(req,res)=>{
    return res.render('userpanel/work_3columns');
}

module.exports.insertcontactdata = async (req, res) => {
    try {
        console.log(req.body)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "khushalirangani18@gmail.com",
                pass: "xkoknpwpsmremilg",
            },
        });


        const info = await transporter.sendMail({
            from: 'khushalirangani18@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ", // Subject line
            html: `<div style='width:100px; height:100px'>
                <img src='cid:photo' width='100' height='100'/>
            </div>` // html body
        });

        if (info) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString()
            await contact.create(req.body)
            return res.redirect('back')
        }
        else {
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}