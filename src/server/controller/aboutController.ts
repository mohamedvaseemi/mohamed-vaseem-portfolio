import { NextResponse } from "next/server";
import { getAboutDetails, addAboutDetails, updateAboutDetails, deleteAboutDetails } from "../service/aboutService";

export async function getAboutController() {
    try {
        const result = await getAboutDetails();
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 200 });
    }
}

export async function addAboutController(req: Request) {
    try {
        const { heading, text } = await req.json();
        const result = await addAboutDetails(heading, text);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function updateAboutController(req: Request) {
    try {
        const { _id, heading, text } = await req.json();
        const result = await updateAboutDetails(_id, heading, text);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function deleteAboutController(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ status: false, message: "id is required" }, { status: 400 });
        const result = await deleteAboutDetails(id);
        return NextResponse.json(result, { status: result.status ? 200 : 400 });
    } catch (error: unknown) {
        return NextResponse.json({ status: false, message: (error as Error).message }, { status: 500 });
    }
}