import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Ward } from "../models/wardSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const addWard = catchAsyncErrors(async(req,res,next) =>{
    const {
        code,
        roomModel,
        roomNumber,
        capacity,
        roomStatus,
        description,
        loadCount
    } = req.body;
    if(
        !code ||
        !roomModel ||
        !roomNumber ||
        !capacity ||
        !roomStatus
    ) {
        return next(new ErrorHandler("Please fill up the form!", 400));
    }

    const roomExist = await Ward.findOne({code});
    if(roomExist){
        return next(new ErrorHandler(`Ward with code ${code} Already exist`));
    }
    const ward = await Ward.create({
        code,
        roomModel,
        roomNumber,
        capacity,
        roomStatus,
        description,
        loadCount
        });
    res.status(200).json({
        success: true,
        message: "New Ward registered!",
    });
});

export const getWardList = catchAsyncErrors(async(req,res,next) =>{
    const wards = await Ward.find();
    res.status(200).json({
        success: true,
        wards,
    });
});