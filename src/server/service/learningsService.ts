import { learningCollection } from "../db/db";
import { ObjectId } from "mongodb";

export async function getLearningsDetails(){
    const collection = await learningCollection();
    const response = await collection.find({}, {}).toArray();
    return {status: true, data: response};
}

export async function addLearningsDetails(name: string, logo: string) {
    const collection = await learningCollection();
    const response = await collection.insertOne({ name, logo });
    if(!response.acknowledged){
        return { status: false, message: "failed to add learnings details"};
    }
    return { status: true };
}

export async function updateLearningsDetails(id: string, name: string, logo: string) {
    const collection = await learningCollection();
    const response = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name, logo } });
    if (response.modifiedCount === 0) {
        return { status: false, message: "failed to update learnings details" };
    }
    return { status: true };
}

export async function deleteLearningsDetails(id: string) {
    const collection = await learningCollection();
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) {
        return { status: false, message: "failed to delete learnings details" };
    }
    return { status: true };
}