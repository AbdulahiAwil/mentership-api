import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: String,
    email: {type : String, unique: true},
    password: String,
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

// Int aanan lagu save garayn database waa laga shaqaynayaa

userSchema.pre('save', async function (next) {
    // Password ka hadusan wax ka badalin 

    if(!this.isModified('password')) return next();

    // hadii password ka wax laga badalay ama uu cusub yahay ka dhig genSalt waxan lagaranayn
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Method kan to compare Password
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// userSchema.method.comparePassword = function (inputPassword){
//     return bcrypt.compare(inputPassword, this.password)
// }

const User = mongoose.model('User', userSchema);

export default User

