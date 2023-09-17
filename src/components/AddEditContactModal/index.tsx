import {Button, Group, Modal, TextInput} from "@mantine/core";
import {ContactScheme} from "../../types/contact.ts";
import {Controller, useForm} from "react-hook-form";
interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (contact?: ContactData & {id?:number}) => void;
    isEditModal: boolean;
    contact?: ContactScheme | null;
}
interface ContactData {
    name: string;
    contact: string;
}

const AddEditContactModal = ({isOpen, onClose, isEditModal, onSubmit, contact}:ContactModalProps) => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm<ContactData>();
    const submitHandler = (data: ContactData & {id?:number}) => {
        if (isEditModal && contact) onSubmit({...data, id: contact.id});
        else onSubmit(data)
        reset();
    };
    return (
        <Modal opened={isOpen} onClose={onClose}>
            <Modal.Title>
                {!isEditModal ? 'Добавить контакт' : 'Редактировать контакт'}
            </Modal.Title>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={contact ? contact.name : ''}
                    rules={{ required: 'Введите имя контакта' }}
                    render={({ field }) => (
                        <TextInput
                            label="Имя"
                            {...field}
                            error={errors.name && errors.name.message}
                        />
                    )}
                />
                <Controller
                    name="contact"
                    control={control}
                    defaultValue={contact ? contact.contact : ''}
                    rules={{
                        required: 'Введите номер телефона',
                        pattern: {
                            value: /^\d{11}$/,
                            message: 'Введите 11 цифр в номере телефона',
                        }
                    }}
                    render={({ field }) => (
                        <TextInput
                            label="Номер телефона"
                            {...field}
                            error={errors.contact && errors.contact.message}
                        />
                    )}
                />
                <Group position={'center'} mt={10}>
                    <Button type={'submit'} color={'green'}>{isEditModal ? "Сохранить" : "Добавить"}</Button>
                    <Button onClick={onClose} color={'red'}>Отмена</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default AddEditContactModal;