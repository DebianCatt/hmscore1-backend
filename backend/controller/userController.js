import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        philsysornic,
        role,
    } = req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !philsysornic ||
        !role
    ) {
        return next(new ErrorHandler("Please fill up the form!", 400));
    }
    let user = await User.findOne({email});
    if(user) {
        return next(new ErrorHandler("User already registered!", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password, 
        gender,
        dob,
        philsysornic,
        role,
    });

    generateToken(user, "User Registered!", 200, res)
    /*res.status(200).json({
        success: true,
        message: "User Registered!",
    });*/
});

export const login = catchAsyncErrors(async(req,res,next) => {
    const {email,password,role} = req.body;
    
    // if (!email || !password || !role){
    //     return next(new ErrorHandler("Please provide login details!", 400))
    // }

    if (!email || !password){
        return next(new ErrorHandler("Please provide login details!", 400))
    }
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or email!", 400));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password or email!", 400));
    }
    
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!", 400));
    }

    // This will call the generateToken and set the correct cookie
    generateToken(user, "User login successfully!", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async(req,res,next) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        philsysornic,
    } = req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !philsysornic
    ) {
        return next(new ErrorHandler("Please fill up the form!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role}Admin with this email already exist!`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        philsysornic,
        role: "Admin",
        });
        res.status(200).json({
            success: true,
            message: "New Admin registered!",
        });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next) =>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out successfully!",
    });
});

export const logoutPatient  = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient logged out successfully!",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported!", 400));
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        philsysornic,
        doctorDepartment
    } = req.body;
    if (
        
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !philsysornic ||
        !doctorDepartment 
    )   {
            return next(new ErrorHandler("Please provide required details!", 400));
        }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));

    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error: ", cloudinaryResponse.error || "Unknown cloudinary error");
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        philsysornic,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(200).json({
        success: true,
        message: "New Doctor registered!",
        doctor
    })
});



export const deleteDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "Doctor") {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

    // Delete doctor avatar from Cloudinary (if it exists)
    if (doctor.docAvatar && doctor.docAvatar.public_id) {
        await cloudinary.uploader.destroy(doctor.docAvatar.public_id);
    }

    // Use findByIdAndDelete to remove the doctor from the database
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully!",
    });
});


// userController.js
export const updateDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "Doctor") {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

    const { firstName, lastName, email, phone, gender, dob, philsysornic, doctorDepartment } = req.body;

    // Update doctor's details
    doctor.firstName = firstName || doctor.firstName;
    doctor.lastName = lastName || doctor.lastName;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.gender = gender || doctor.gender;
    doctor.dob = dob || doctor.dob;
    doctor.philsysornic = philsysornic || doctor.philsysornic;
    doctor.doctorDepartment = doctorDepartment || doctor.doctorDepartment;

    // handle new image upload
    if (req.files && req.files.docAvatar) {
        const { docAvatar } = req.files;

        // checks the old avatar exists and delete it from Cloudinary
        if (doctor.docAvatar && doctor.docAvatar.public_id) {
            await cloudinary.uploader.destroy(doctor.docAvatar.public_id);
        }

        // uppload new image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
        doctor.docAvatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    await doctor.save();

    res.status(200).json({
        success: true,
        message: "Doctor updated successfully!",
        doctor
    });
});
