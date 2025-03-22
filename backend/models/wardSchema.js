import mongoose from "mongoose";
const wardSchema = new mongoose.Schema({
    code : {
        type : String
    },
    roomNumber : {
        type : String
    },
    roomModel : {
        type : String
    },
    roomStatus : {
        type: String
    },
    loadCount : {
        type : Number
    },
    capacity: {
        type : Number
    },
    description: {
        type : String
    },
    lastUpdate : {
        type: String
    }
});



export const Ward = mongoose.model("Ward", wardSchema);
