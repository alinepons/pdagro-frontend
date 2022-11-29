import { User } from "./user";

export class AuthResponse {
    token: string = '';
    user: User = {} as User

    constructor(init: Partial<AuthResponse>) {
        Object.assign(this, init);
    }
}
