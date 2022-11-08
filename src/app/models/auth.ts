export class Auth {
    username: string = '';
    password: string = '';

    constructor(init: Partial<Auth>) {
        Object.assign(this, init);
    }
}