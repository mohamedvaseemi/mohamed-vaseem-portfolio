import { updateProjectController } from "@/server/controller/projectsController";

export async function PUT(req: Request) {
    return await updateProjectController(req);
}
