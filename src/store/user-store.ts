import { makeAutoObservable } from "mobx";
import { UserScheme } from "../types/user";

class UserStore {
    user: UserScheme = {} as UserScheme;
    constructor() {
        makeAutoObservable(this);
    }

    setUser = (user: UserScheme) => {
        this.user = user;
    };
}

export default new UserStore();
