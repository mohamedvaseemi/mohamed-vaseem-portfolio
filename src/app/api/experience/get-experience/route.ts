import { getExperienceController } from "@/server/controller/experienceController";

export async function GET() {
    return await getExperienceController();
}
