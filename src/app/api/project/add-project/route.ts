import { addProjectController } from "@/server/controller/projectsController";

export async function POST(req: Request) {
    return await addProjectController(req);
}
