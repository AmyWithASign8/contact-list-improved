import { ContactScheme } from "../types/contact";
import { makeAutoObservable } from "mobx";
import { ContactsApi } from "../api/contact-api";
import { AxiosError } from "axios";
import {notifications} from "@mantine/notifications";

class ContactsStore {
    contacts: ContactScheme[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchContacts = async () => {
        try {
            const { data } = await ContactsApi.getContacts();
            this.contacts = data.contacts;
        } catch (e) {
            notifications.show({
                title: 'Ошибка',
                message: 'Ошибка при загрузке списка контактов!',
                color: 'red'
            })
        }
    };

    createContact = async (contact: { name: string; contact: string }) => {
        try {
            const { data } = await ContactsApi.createContact({
                name: contact.name,
                contact: contact.contact,
            });
            this.contacts.unshift(data.profile);

            notifications.show({
                title: 'Успех',
                message: 'Контакт успешно создан!',
            })
        } catch (e) {
            if (e instanceof AxiosError) {
                notifications.show({
                    title: 'Ошибка',
                    message: 'Ошибка валидации!',
                    color: 'red'
                })
            } else {
                notifications.show({
                    title: 'Ошибка',
                    message: 'Ошибка сервера!',
                    color: 'red'
                })
            }
        }
    };

    deleteContact = async (contactId: number) => {
        try {
            await ContactsApi.deleteContact(contactId);
            this.contacts = this.contacts.filter((el) => el.id !== contactId);
        } catch (e) {
            notifications.show({
                title: 'Ошибка',
                message: 'Ошибка при удалении контакта!',
                color: 'red'
            })
        }
    };

    editContact = async (contact: ContactScheme) => {
        try {
            const { data } = await ContactsApi.editContact(contact);

            const index = this.contacts.findIndex(({ id }) => id === data.id);
            if (index !== -1) {
                this.contacts[index] = data;
            }
            notifications.show({
                title: 'Успех',
                message: 'Контакт успешно изменен!',
            })
        } catch (e) {
                notifications.show({
                    title: 'Ошибка',
                    message: `Ошибка сервера!${e}`,
                    color: 'red'
                })
        }
    };
}

export default new ContactsStore();
