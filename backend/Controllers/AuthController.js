import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { oauth2Client } from '../Utils/google.js';
dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET;
const JWTTIMEOUT = process.env.JWTTIMEOUT;

export const googleLogin = async (req, res) => {
    const code = req.query.code;

    try {
        if (!code) {
            return res.status(400).json({ message: "Authorization code is required" });
        }

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );
        const { email, id: openid, name, picture: image } = data;
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = new UserModel({ email, openid, name, image });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: JWTTIMEOUT,
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                image: user.image,
            },
        });

    } catch (err) {
        console.error("Error in Google Login:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};
