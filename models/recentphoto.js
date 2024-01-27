const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const recentImagepath="/uploads/recentphoto_image";

const recentSchema = mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    recent_image :{
        type : String,
        required :true
    }, 
    isActive :{
        type : Boolean,
        required : true
    },
    created_date :{
        type : String,
        required :true
    },
    updated_date :{
        type : String,
        required :true
    }
});

const recentstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",recentImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

recentSchema.statics.recentuploadImage=multer({storage : recentstorage}).single('recent_image');
recentSchema.statics.recentpath=recentImagepath;


const recent=mongoose.model('recent',recentSchema);
module.exports=recent;