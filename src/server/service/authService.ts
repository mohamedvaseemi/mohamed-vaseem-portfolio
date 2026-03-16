import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { authCollection } from "../db/db";

const JWT_SECRET = process.env.JWT_SECRET || "ISMAIL";

function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

async function loginDetails(email: string, password: string) {
    const collection = await authCollection();
    const user = await collection.findOne({ username: email });
    
    if (!user) {
        return { status: false, message: "User not found" };
    }
    
    const verifyPass = await argon2.verify(user.password, password);
    
    if (!verifyPass) {
        return { status: false, message: "Incorrect password" };
    }
    
    const token = generateToken({ username: user.username, authorised: true });
    return { status: true, token };
}

async function registerDetails(organization: string, email: string, password: string) {
    const collection = await authCollection();
    const checkUser = await collection.findOne({ username: email });

    if (checkUser) {
        return { status: false, message: "User already exists with this email" };
    }
    
    const encryptPass = await argon2.hash(password);
    const addUser = await collection.insertOne({ username: email, password: encryptPass });
    
    if (!addUser.acknowledged) {
        return { status: false, message: "Failed to register user" };
    }
    
    const token = generateToken({ username: email, authorised: true });
    return { status: true, token };
}

const authService = {
    loginDetails,
    registerDetails
};

export default authService;
