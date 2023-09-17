import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Text, Input, Button, PasswordInput, Center} from '@mantine/core'
import {useLocation} from "react-router";
import { observer } from "mobx-react-lite";
import AuthStore from "../../store/user-auth-store.ts";

type Inputs = {
    name: string
    password: string
}

const AuthForm = observer(() => {
    const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const {pathname} = useLocation()
    const isRegPage = pathname === "/auth/reg"
    const { loginUser, registerUser } = AuthStore;

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (isRegPage)
           await registerUser(data.name, data.password)
        else
            await loginUser(data.name, data.password)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Поле имя обязательно для заполнения',
                        minLength: {
                            value: 3,
                            message: 'Имя должно содержать не менее 3 символов',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Имя должно содержать не более 30 символов',
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <Input
                                {...field}
                                placeholder="Имя"
                            />
                            {errors.name && <Text color="red">{errors.name.message}</Text>}
                        </>
                    )}
                />
            </div>
            <div>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Поле пароль обязательно для заполнения',
                        minLength: {
                            value: 7, // Пароль должен содержать не менее 7 символов (6 символов + 1)
                            message: 'Пароль должен содержать не менее 7 символов',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Пароль должен содержать не более 30 символов',
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Пароль должен содержать только латинские буквы и цифры',
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <PasswordInput
                                mt={10}
                                {...field}
                                placeholder="Пароль"
                            />
                            {errors.password && <Text color="red">{errors.password.message}</Text>}
                        </>
                    )}
                />
            </div>
            <Center>
                <Button type="submit" mt={10}>{isRegPage ? "Зарегистрироваться" : "Войти"}</Button>
            </Center>
        </form>
    );
});

export default AuthForm;