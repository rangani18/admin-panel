const mongoose=require('mongoose');

const categorySchema = mongoose.Schema({
    title :{
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

const category=mongoose.model('category',categorySchema);
module.exports=category;