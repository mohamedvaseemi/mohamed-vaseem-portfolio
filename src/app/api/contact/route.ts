import { addContactController, getContactController } from "@/server/controller/contactController";

export async function POST(req: Request) {
    return await addContactController(req);
}

export async function GET() {
    return await getContactController();
}