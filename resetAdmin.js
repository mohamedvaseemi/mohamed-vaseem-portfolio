const { MongoClient } = require("mongodb");
const argon2 = require("argon2");
require("dotenv").config({ path: ".env.local" });

const MongoUri = "mongodb+srv://mohamedvaseem:Vaseem&&11@portfolio.dbvrolx.mongodb.net/";

async function run() {
    console.log("Connecting to MongoDB...");
    const client = new MongoClient(MongoUri);
    try {
        await client.connect();
        console.log("Connected successfully!");
        
        const db = client.db("my_portfolio_details");
        const authCollection = db.collection("authorised");

        console.log("Deleting existing admin users...");
        const deleteResult = await authCollection.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} users.`);

        console.log("Adding new admin user...");
        const defaultEmail = "vaseem.ismail.mohamed@gmail.com";
        const defaultPassword = "Vaseem&&11"; // Set the standard initial password here
        
        const encryptPass = await argon2.hash(defaultPassword);
        await authCollection.insertOne({
            username: defaultEmail,
            password: encryptPass
        });
        
        console.log("✅ Default admin user created successfully!");
        console.log("-----------------------------------------");
        console.log(`Email:        ${defaultEmail}`);
        console.log(`Password:     ${defaultPassword}`);
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("❌ Error setting up admin:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

run();
