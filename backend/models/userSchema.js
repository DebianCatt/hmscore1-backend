import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minLength: [2, "First name must contain atleast 2 characters!"]
    },
    lastName: {
        type:String,
        required: true,
        minLength: [2, "Last name must contain atleast 2 characters!"]
    },
    email: {
        type:String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    phone: {
        type:String,
        required: true,
        minLength: [11, "Phone number must be 11 Digits!"],
        maxLength: [11, "Phone number must be 11 Digits!"]
    },
    philsysornic: {  //PhilSys ID  or National Identity Card(NIC)
        type:String,
        required: true,
        minLength: [12, "PhilSys or NIC must contain atleast 12 characters!"],
        maxLength: [12, "PhilSys or NIC must contain atleast 12 characters!"]
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required!"],

    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        minLength: [10, "Password must contain atleast 10 characters!"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password); 
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}
export const User = mongoose.model("User", userSchema);