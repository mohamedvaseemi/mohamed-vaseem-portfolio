import { deleteProjectController } from "@/server/controller/projectsController";

export async function DELETE(req: Request) {
    return await deleteProjectController(req);
}
