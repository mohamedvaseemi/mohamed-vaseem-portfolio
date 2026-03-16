import { updateLearningsController } from "@/server/controller/learningsController";

export async function PUT(req: Request) {
    return await updateLearningsController(req);
}
