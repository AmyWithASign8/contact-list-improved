import ContactCard from "../../components/ContactCard";
import {Button, Center, Container, Group, Stack, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {ContactScheme} from "../../types/contact.ts";
import AddEditContactModal from "../../components/AddEditContactModal";
import {observer} from "mobx-react-lite";
import ContactsStore from "../../store/contacts-store.ts";

const ContactListPage = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const {createContact, editContact, fetchContacts, contacts, deleteContact} = ContactsStore;
    useEffect(() => {
        fetchContacts()
    },[])
    const [currentContact, setCurrentContact] = useState<ContactScheme | null>(null);
    const handleEditContact = async (contact?: ContactScheme) => {
        if (!contact) return
        await editContact(contact)
        setCurrentContact(null)
        setEditModalOpen(false)
    };
    const handleCreateContact = async (contact?: ContactScheme) => {
        if (!contact) return
        await createContact(contact)
        setCurrentContact(null)
        setAddModalOpen(false)
    }

    const handleDeleteContact = async (contactId: number) => {
        await deleteContact(contactId)
    }
    return (
        <div>
            <AddEditContactModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleCreateContact} isEditModal={false}/>
            <AddEditContactModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} isEditModal onSubmit={handleEditContact} contact={currentContact}/>
            <Container size={'xl'}>
                <Group position={'apart'}>
                    <Title>Список контактов:</Title>
                    <Button onClick={() => setAddModalOpen(true)} color={'green'}>Добавить контакт</Button>
                </Group>
                {contacts.length !== 0
                    ?
                        <>
                            {contacts.map((obj) => (
                                <ContactCard data={obj}>
                                    <Stack>
                                        <Button onClick={() => {
                                            setEditModalOpen(true)
                                            setCurrentContact(obj)
                                        }}>Редактировать</Button>
                                        <Button color={'red'} onClick={() => handleDeleteContact(obj.id)}>Удалить</Button>
                                    </Stack>
                                </ContactCard>
                            ))}
                        </>
                    :
                        <Center mt={'10%'}><Title>Ваш список контактов пуст</Title></Center>}
            </Container>
        </div>
    );
};

export default observer(ContactListPage);