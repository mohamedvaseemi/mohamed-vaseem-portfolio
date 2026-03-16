import { NextResponse } from "next/server";
import { addContactDetails } from "../service/contactService";

export async function addContactController(req: Request) {
    const {name, email, message} = await req.json();
    const addContact = await addContactDetails(name, email, message);
    if(!addContact.status){
        return NextResponse.json({ addContact }, { status: 400 });
    }
    return NextResponse.json({ addContact }, { status: 200 });
}