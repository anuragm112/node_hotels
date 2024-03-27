const mongoose=require('mongoose');
const MenuSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ['sour','spicy','sweet']
    },
    is_eat:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }
});
const menuModel=mongoose.model('MenuItem',MenuSchema);
module.exports=menuModel;