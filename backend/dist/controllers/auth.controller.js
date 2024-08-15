import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { loginSchema, signUpSchema } from "../validators/index.js";
export const signUp = async (req, res) => {
    try {
        const validatedData = signUpSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.errors });
        }
        const { fullName, username, password, email, confirmPassword, gender } = validatedData.data;
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        // check if email is already registered
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Generate profile picture URL based on gender
        const profilePicUrl = `https://avatar.iran.liara.run/public/${gender === "Male" ? "boy" : "girl"}?username=${username}`;
        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                email,
                gender,
                profilePic: profilePicUrl,
            },
        });
        if (newUser) {
            // generate token for response
            generateToken(newUser.id, res);
            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser.id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    gender: newUser.gender,
                    profilePic: newUser.profilePic,
                },
            });
        }
        else {
            res.status(500).json({ error: "Failed to create user, invalid data" });
        }
    }
    catch (error) {
        console.error('Error in signup controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        // Generate and send a JWT token
        const token = generateToken(user.id, res);
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                gender: user.gender,
                profilePic: user.profilePic,
            },
            token,
        });
    }
    catch (error) {
        console.error('Error in login controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error('Error in logout controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        // Find the user by ID attached to the req object
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            user: {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                gender: user.gender,
                profilePic: user.profilePic,
            },
        });
    }
    catch (error) {
        console.error('Error in get user profile controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
