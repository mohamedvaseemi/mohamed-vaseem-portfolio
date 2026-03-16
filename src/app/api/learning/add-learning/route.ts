import { addLearningsController } from "@/server/controller/learningsController";

export async function POST(req: Request) {
    return await addLearningsController(req);
}
