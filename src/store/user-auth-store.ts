import { makeAutoObservable, runInAction } from "mobx";
import { AuthApi } from "../api/auth-api";
import { showNotification } from "@mantine/notifications";
import UserStore from "./user-store";
import { UserScheme } from "../types/user";
import jwtDecode from "jwt-decode";

class AuthStore {
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    logout = () => {
        localStorage.removeItem("token");
        this.isAuth = false;
        UserStore.setUser({} as UserScheme);
    };

    checkAuth = async () => {
        try {
            const { data } = await AuthApi.check();
            runInAction(() => {
                this.isAuth = true;
                UserStore.setUser(data);
            });
        } catch (e) {
            this.logout();
        }
    };

    loginUser = async (name: string, password: string) => {
        try {
            const { data } = await AuthApi.login(name, password);
            const decodedToken = jwtDecode<UserScheme>(data.token);
            console.log(data);
            localStorage.setItem("token", data.token);
            runInAction(() => {
                UserStore.setUser(decodedToken);
                this.isAuth = true;
            });
            showNotification({
                title: "Успешная авторизация",
                message: "Вы вошли в свой аккаунт",
            });
        } catch (e) {
                showNotification({
                    title: "Ошибка сервера",
                    message: "Возможно вы ввели неверные данные или попробуйте позже",
                    color: "red"
                });
        }
    };

    registerUser = async (name: string, password: string) => {
        try {
            const { data } = await AuthApi.register(name, password);
            const decodedToken = jwtDecode<UserScheme>(data.token);
            localStorage.setItem("token", data.token);
            runInAction(() => {
                this.isAuth = true;
                UserStore.setUser(decodedToken);
            });
            showNotification({
                title: "Успешная авторизация",
                message: "Вы успешно зарегистрировались",
            });
        } catch (e) {
                showNotification({
                    title: "Ошибка сервера",
                    message: "Возможно пользователь с таким именем уже существует или попробуйте позже",
                    color: "red"
                });
        }
    };
}

export default new AuthStore();
