import { educationCollection } from "../db/db";
import { ObjectId } from "mongodb";

export async function getEducationDetails(){
    const collection = await educationCollection();
    const response = await collection.find({}, {}).toArray();
    return {status: true, data: response};
}

export async function addEducationDetails(degree: string, school: string, year: string, desc: string) {
    const collection = await educationCollection();
    const response = await collection.insertOne({ degree, school, year, desc });
    if(!response.acknowledged){
        return { status: false, message: "failed to add education details"};
    }
    return { status: true };
}

export async function updateEducationDetails(id: string, degree: string, school: string, year: string, desc: string) {
    const collection = await educationCollection();
    const response = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { degree, school, year, desc } });
    if (response.modifiedCount === 0) {
        return { status: false, message: "failed to update education details" };
    }
    return { status: true };
}

export async function deleteEducationDetails(id: string) {
    const collection = await educationCollection();
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) {
        return { status: false, message: "failed to delete education details" };
    }
    return { status: true };
}