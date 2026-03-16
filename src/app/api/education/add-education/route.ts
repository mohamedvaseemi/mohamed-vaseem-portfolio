import { addEducationController } from "@/server/controller/educationController";

export async function POST(req: Request) {
    return await addEducationController(req);
}
