import { contactCollection } from "../db/db";
import config from "../config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS
    }
});

export async function addContactDetails(name: string, email: string, message: string) {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
    const collection = await contactCollection();
    const response = await collection.insertOne({ name, email, message, date, time });
    if(!response.acknowledged){
        return { status: false, message: "failed to save contact details"};
    }
    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${config.EMAIL_USER}>`,
            to: email,
            subject: "Thank you for reaching out!",
            text: `Hi ${name},\n\nThank you for reaching out and reviewing my portfolio. I truly appreciate your response and the time you took to share your thoughts. I will definitely consider your input, and if I need anything further, I will surely reach out to you.\n\nBest regards,\nMohamed Vaseem`
        });
    } catch (mailErr) {
        console.error("Email send failed:", mailErr);
        // Don't fail the whole request if email fails
    }
    return { status: true };
}