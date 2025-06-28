import mongoose from "mongoose";

const {Schema}=mongoose
const chatStats=new Schema({
    department:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    counter:{
        type:Number,
        default:0
    },
    dates:[{
        type:Date,
    }]
})



chatStats.pre("save", function(next) {
    if (this.isModified('counter')) {
        this.dates.push(new Date());
    }
    next();
});

const ChatStats=mongoose.model('ChatStats',chatStats)
export default ChatStats