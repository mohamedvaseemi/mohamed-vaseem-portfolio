import { updateExperienceController } from "@/server/controller/experienceController";

export async function PUT(req: Request) {
    return await updateExperienceController(req);
}
