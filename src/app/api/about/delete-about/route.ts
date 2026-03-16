import { deleteAboutController } from "@/server/controller/aboutController";

export async function DELETE(req: Request) {
    return await deleteAboutController(req);
}
