import { MongoClient } from "mongodb";
import config from "../config";

const MongoUri: string = config.MONGO_URI!;

// Singleton client — lazy-connects on first use
let client: MongoClient | null = null;
let connectionPromise: Promise<MongoClient> | null = null;

async function getClient(): Promise<MongoClient> {
    if (client) return client;
    if (!connectionPromise) {
        connectionPromise = MongoClient.connect(MongoUri, {
            serverSelectionTimeoutMS: 2000,
        }).then((c) => {
            client = c;
            console.log("✅ MongoDB connected");
            return c;
        }).catch((err) => {
            console.error("❌ MongoDB connection failed:", err.message);
            connectionPromise = null; // Reset promise so we can try again
            throw err;
        });
    }
    return connectionPromise;
}

// Legacy explicit connect (kept for backward compat)
export async function connectDB() {
    await getClient();
}

export async function personalDetailsDB() {
    const c = await getClient();
    return c.db("my_portfolio_details");
}

export async function aboutCollection() {
    return (await personalDetailsDB()).collection("about");
}

export async function learningCollection() {
    return (await personalDetailsDB()).collection("learning");
}

export async function projectCollection() {
    return (await personalDetailsDB()).collection("workdone");
}

export async function educationCollection() {
    return (await personalDetailsDB()).collection("education");
}

export async function experienceCollection() {
    return (await personalDetailsDB()).collection("experience");
}

export async function contactCollection() {
    return (await personalDetailsDB()).collection("reacted-me");
}

export async function authCollection() {
    return (await personalDetailsDB()).collection("authorised");
}