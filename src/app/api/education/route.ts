import { getEducationController } from "@/server/controller/educationController";

export async function GET() {
    return await getEducationController();
}