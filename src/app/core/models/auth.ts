export class Auth {
    email: string = '';
    password: string = '';
    code?: string

    constructor(init: Partial<Auth>) {
        Object.assign(this, init);
    }
}