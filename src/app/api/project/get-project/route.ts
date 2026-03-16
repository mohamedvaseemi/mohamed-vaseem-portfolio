import { getProjectController } from "@/server/controller/projectsController";

export async function GET() {
    return await getProjectController();
}
