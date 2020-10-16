const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required: [true,'Please enter an password'],
        minlength:[6,'Minimal password length is 6 characters']
    },
})
// fire a function after doc saved to db
userSchema.post('save',function(doc,next){
    console.log('new user was created & saved',doc);
    next();
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    //console.log('user about to be created & saved',this);
    next();
})

const User = mongoose.model('user',userSchema);


module.exports = User;