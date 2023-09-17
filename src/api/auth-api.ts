import { $authHttp, $http } from "./instance";

export const AuthApi = {
    login: (name: string, password: string) =>
        $http.post("/api/user/login", {
            name,
            password,
        }),
    register: (name: string, password: string) =>
        $http.post("/api/user/register", {
            name,
            password,
        }),
    check: () => $authHttp.get(`/api/user/auth`),
};
