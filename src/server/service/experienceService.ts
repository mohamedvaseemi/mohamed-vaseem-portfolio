import { experienceCollection } from "../db/db";
import { ObjectId } from "mongodb";

export async function getExperienceDetails(){
    const collection = await experienceCollection();
    const response = await collection.find({}, {}).toArray();
    return {status: true, data: response};
}

export async function addExperienceDetails(role: string, company: string, duration: string, description: string) {
    const collection = await experienceCollection();
    const response = await collection.insertOne({ role, company, duration, description });
    if(!response.acknowledged){
        return { status: false, message: "failed to add experience details"};
    }
    return { status: true };
}

export async function updateExperienceDetails(id: string, role: string, company: string, duration: string, description: string) {
    const collection = await experienceCollection();
    const response = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { role, company, duration, description } });
    if (response.modifiedCount === 0) {
        return { status: false, message: "failed to update experience details" };
    }
    return { status: true };
}

export async function deleteExperienceDetails(id: string) {
    const collection = await experienceCollection();
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) {
        return { status: false, message: "failed to delete experience details" };
    }
    return { status: true };
}