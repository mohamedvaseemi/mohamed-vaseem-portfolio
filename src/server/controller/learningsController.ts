import { NextResponse } from "next/server";
import { getLearningsDetails, addLearningsDetails, updateLearningsDetails, deleteLearningsDetails } from "../service/learningsService";

export async function getLearningsController() {
    try {
        const result = await getLearningsDetails();
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 200 });
    }
}

export async function addLearningsController(req: Request) {
    try {
        const { name, logo } = await req.json();
        const result = await addLearningsDetails(name, logo);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function updateLearningsController(req: Request) {
    try {
        const { _id, name, logo } = await req.json();
        const result = await updateLearningsDetails(_id, name, logo);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function deleteLearningsController(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ status: false, message: "id is required" }, { status: 400 });
        const result = await deleteLearningsDetails(id);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}