import {Card, Group, Text} from "@mantine/core";
import {ReactNode} from "react";
import {ContactScheme} from "../../types/contact.ts";
interface ContactCardInterface {
    children: ReactNode,
    data: ContactScheme
}
const ContactCard = ({children, data}: ContactCardInterface) => {
    return (
        <Card shadow="xl" padding="lg" radius="md" withBorder mt={40}>
            <Group position={'apart'}>
                    <Group>
                        <Text size={'xl'} weight={500} color={'dimmed'}>Название контакта:</Text>
                        <Text size={'xl'} weight={500}>{data.name}</Text>
                    </Group>
                <Group>
                    <Text size={'xl'} weight={500} color={'dimmed'}>Номер телефона:</Text>
                    <Text size={'xl'} weight={500}>{data.contact}</Text>
                </Group>
                {children}
            </Group>
        </Card>
    );
};

export default ContactCard;