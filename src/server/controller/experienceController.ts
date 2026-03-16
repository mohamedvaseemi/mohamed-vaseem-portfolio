import { NextResponse } from "next/server";
import { getExperienceDetails, addExperienceDetails, updateExperienceDetails, deleteExperienceDetails } from "../service/experienceService";

export async function getExperienceController() {
    try {
        const result = await getExperienceDetails();
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function addExperienceController(req: Request) {
    try {
        const { role, company, duration, description } = await req.json();
        const result = await addExperienceDetails(role, company, duration, description);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function updateExperienceController(req: Request) {
    try {
        const { _id, role, company, duration, description } = await req.json();
        const result = await updateExperienceDetails(_id, role, company, duration, description);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function deleteExperienceController(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ status: false, message: "id is required" }, { status: 400 });
        const result = await deleteExperienceDetails(id);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}