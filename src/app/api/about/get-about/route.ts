import { getAboutController } from "@/server/controller/aboutController";

export async function GET() {
    return await getAboutController();
}
