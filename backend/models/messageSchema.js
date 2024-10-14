/*

DISABLED AS OF NOW

import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
        minLength: [11, "Phone number must be 11 Digits!"]
    },
    message: {
        type:String,
        required: true,
        minLength: [10, "Message must contain atleast 10 characters!"]
    },
})

export const Message = mongoose.model("Message", messageSchema);

*/