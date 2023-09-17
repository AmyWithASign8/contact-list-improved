import {$authHttp} from "./instance";
import { ContactScheme } from "../types/contact";

export const ContactsApi = {
    getContacts: () =>
        $authHttp.get(`/api/contact/`),

    createContact: (contact: { contact: string; name: string }) =>
        $authHttp.post(`/api/contact/create`, contact),

    deleteContact: (contactId: number) =>
        $authHttp.delete(`/api/contact/delete`, {
            params: {
                contactId,
            },
        }),

    editContact: (contact: Omit<ContactScheme, "userId">) =>
        $authHttp.post(`/api/contact/edit`, {contact}),
};
