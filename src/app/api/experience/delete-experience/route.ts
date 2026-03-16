import { deleteExperienceController } from "@/server/controller/experienceController";

export async function DELETE(req: Request) {
    return await deleteExperienceController(req);
}
