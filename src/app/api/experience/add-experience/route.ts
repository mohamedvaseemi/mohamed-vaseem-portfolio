import { addExperienceController } from "@/server/controller/experienceController";

export async function POST(req: Request) {
    return await addExperienceController(req);
}
