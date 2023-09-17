import Index from "../../components/AuthForm";
import {Container, Divider, Title, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const AuthPage = () => {
    const {pathname} = useLocation()
    const isRegPage = pathname === '/auth/reg'
    return (
        <div>
            <Container size={'xs'} mt={'15%'}>
                <Title mb={20}>{isRegPage ? "Регистрация" : "Вход в аккаунт"}</Title>
                <Index/>
                <Divider my={"xl"} variant={'dashed'}/>
                {isRegPage
                    ? <Text>У вас уже есть аккаунт? <Text color={'blue'} underline component={Link} to={'/auth/login'}> Войдите в него</Text></Text>
                    : <Text>У вас нет аккаунта? <Text color={'blue'} underline component={Link} to={'/auth/reg'}>Зарегитсрируйтесь</Text></Text>}
            </Container>
        </div>
    );
};

export default AuthPage;