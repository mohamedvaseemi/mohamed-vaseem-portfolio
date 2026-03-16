import { projectCollection } from "../db/db";
import { ObjectId } from "mongodb";

export async function getProjectDetails(){
    const collection = await projectCollection();
    const response = await collection.find({}, {}).toArray();
    return {status: true, data: response};
}

export async function addProjectDetails(title: string, desc: string, project_url: string, image: string) {
    const collection = await projectCollection();
    const response = await collection.insertOne({ title, desc, project_url, image });
    if(!response.acknowledged){
        return { status: false, message: "failed to add project details"};
    }
    return { status: true };
}

export async function updateProjectDetails(id: string, title: string, desc: string, project_url: string, image: string) {
    const collection = await projectCollection();
    const response = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { title, desc, project_url, image } });
    if (response.modifiedCount === 0) {
        return { status: false, message: "failed to update project details" };
    }
    return { status: true };
}

export async function deleteProjectDetails(id: string) {
    const collection = await projectCollection();
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 0) {
        return { status: false, message: "failed to delete project details" };
    }
    return { status: true };
}