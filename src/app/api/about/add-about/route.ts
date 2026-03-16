import { addAboutController } from "@/server/controller/aboutController";

export async function POST(req: Request) {
    return await addAboutController(req);
}
