import { NextResponse } from "next/server";
import { addContactDetails, getContactDetails } from "../service/contactService";

export async function addContactController(req: Request) {
    try {
        const {name, email, message} = await req.json();
        const addContact = await addContactDetails(name, email, message);
        if(!addContact.status){
            return NextResponse.json({ addContact }, { status: 400 });
        }
        return NextResponse.json({ addContact }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: false, message: "Invalid request payload" }, { status: 400 });
    }
}

export async function getContactController() {
    const fetchContacts = await getContactDetails();
    if (!fetchContacts.status) {
        return NextResponse.json(fetchContacts, { status: 400 });
    }
    return NextResponse.json(fetchContacts, { status: 200 });
}