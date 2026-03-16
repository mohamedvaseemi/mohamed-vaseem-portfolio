import { getLearningsController } from "@/server/controller/learningsController";

export async function GET() {
    return await getLearningsController();
}
