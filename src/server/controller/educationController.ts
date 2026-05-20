import { NextResponse } from "next/server";
import { getEducationDetails, addEducationDetails, updateEducationDetails, deleteEducationDetails } from "../service/educationService";

export async function getEducationController() {
    try {
        const result = await getEducationDetails();
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 200 });
    }
}

export async function addEducationController(req: Request) {
    try {
        const { degree, school, year, desc } = await req.json();
        const result = await addEducationDetails(degree, school, year, desc);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function updateEducationController(req: Request) {
    try {
        const { _id, degree, school, year, desc } = await req.json();
        const result = await updateEducationDetails(_id, degree, school, year, desc);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function deleteEducationController(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ status: false, message: "id is required" }, { status: 400 });
        const result = await deleteEducationDetails(id);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}