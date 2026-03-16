import { aboutCollection } from "../db/db";
import { ObjectId } from "mongodb";

export async function getAboutDetails(){
    const collection = await aboutCollection();
    const response = await collection.find({}, {}).toArray();
    return {status: true, data: response};
}

export async function addAboutDetails(heading: string, text: string) {
    const collection = await aboutCollection();
    const response = await collection.insertOne({ heading, text });
    if(!response.acknowledged){
        return { status: false, message: "failed to add about details"};
    }
    return { status: true };
}

export async function updateAboutDetails(id: string, heading: string, text: string) {
    const collection = await aboutCollection();
    const response = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { heading, text } });
    if (response.modifiedCount === 0) {
        return { status: false, message: "failed to update about details" };
    }
    return { status: true };
}

export async function deleteAboutDetails(id: string) {
    const collection = await aboutCollection();
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) {
        return { status: false, message: "failed to delete about details" };
    }
    return { status: true };
}