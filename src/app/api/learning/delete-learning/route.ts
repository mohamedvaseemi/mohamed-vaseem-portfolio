import { deleteLearningsController } from "@/server/controller/learningsController";

export async function DELETE(req: Request) {
    return await deleteLearningsController(req);
}
