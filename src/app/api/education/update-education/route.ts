import { updateEducationController } from "@/server/controller/educationController";

export async function PUT(req: Request) {
    return await updateEducationController(req);
}
