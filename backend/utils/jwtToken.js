export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();  // Assuming you have this function in your User model
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken"; // Set cookie based on role
    
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Make sure it's sent over HTTPS
        sameSite: 'None',  // Necessary for cross-domain cookies (subdomain)
    }).json({
        success: true,
        message,
        user,
        token,
    });
}
