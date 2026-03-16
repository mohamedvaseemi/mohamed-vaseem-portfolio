import { addContactController } from "@/server/controller/contactController";

export async function POST(req: Request) {
    return await addContactController(req);
}