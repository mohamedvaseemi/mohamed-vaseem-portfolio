import { contactCollection } from "../db/db";

export async function addContactDetails(name: string, email: string, message: string) {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
    const collection = await contactCollection();
    const response = await collection.insertOne({ name, email, message, date, time });
    if(!response.acknowledged){
        return { status: false, message: "failed to save contact details"};
    }
    return { status: true };
}

export async function getContactDetails() {
    try {
        const collection = await contactCollection();
        const data = await collection.find({}).sort({ _id: -1 }).toArray();
        return { status: true, data };
    } catch (err) {
        console.error("Error fetching contact details:", err);
        return { status: false, message: "Failed to fetch contact details" };
    }
}