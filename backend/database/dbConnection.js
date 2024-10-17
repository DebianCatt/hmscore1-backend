import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"HMS_CORE1_CLUSTERQ"
    }).then(() => {
        console.log("Conencted to database");
    }).catch((err) =>{
        console.log(`Error occured while connecting to database: ${err}`);
    });
};


