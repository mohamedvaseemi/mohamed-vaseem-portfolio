import { updateAboutController } from "@/server/controller/aboutController";

export async function PUT(req: Request) {
    return await updateAboutController(req);
}
