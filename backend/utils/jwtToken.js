export const generateToken = (user, message, statusCode, res) => {
    try {
        const token = user.generateJsonWebToken();
        const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
        const isProduction = process.env.NODE_ENV === "production";

        res.status(statusCode).cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
        }).json({
            success: true,
            message,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Token generation failed", error: error.message });
    }
};
