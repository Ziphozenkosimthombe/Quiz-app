import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String ,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String ,
        required: true,
        minlength: 8
    },
})

const User = mongoose.model('User', UserSchema);

export default User; 