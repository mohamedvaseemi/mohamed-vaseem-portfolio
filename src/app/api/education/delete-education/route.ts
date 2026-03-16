import { deleteEducationController } from "@/server/controller/educationController";

export async function DELETE(req: Request) {
    return await deleteEducationController(req);
}
