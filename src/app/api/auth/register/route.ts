import { NextResponse } from "next/server";
import authService from "@/server/service/authService";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { organization, email, password } = body;
        
        if (!organization || !email || !password) {
            return NextResponse.json({ status: false, message: "Missing required fields" }, { status: 400 });
        }

        const result = await authService.registerDetails(organization, email, password);
        
        if (!result.status) {
            return NextResponse.json(result, { status: 400 });
        }
        
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
}
