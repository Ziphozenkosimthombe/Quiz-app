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

export const getUsers = () => User.find();
export const deleteUserById = (id: string) => User.findByIdAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate({id, values})
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const getUserByUsername = (username: string) => User.findOne({username: { $regex: new RegExp(username, 'i')}});
export const protectRouteUser = (userId: string) => User.findById(userId).select("-password");



// export const getUserById = (id: string) => UserModel.findById(id);
