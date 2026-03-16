import { NextResponse } from "next/server";
import { getProjectDetails, addProjectDetails, updateProjectDetails, deleteProjectDetails } from "../service/projectService";

export async function getProjectController() {
    try {
        const result = await getProjectDetails();
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function addProjectController(req: Request) {
    try {
        const { title, desc, project_url, image } = await req.json();
        const result = await addProjectDetails(title, desc, project_url, image);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function updateProjectController(req: Request) {
    try {
        const { _id, title, desc, project_url, image } = await req.json();
        const result = await updateProjectDetails(_id, title, desc, project_url, image);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function deleteProjectController(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ status: false, message: "id is required" }, { status: 400 });
        const result = await deleteProjectDetails(id);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}