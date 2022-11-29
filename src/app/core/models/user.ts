export class User {
    id: string = '';
    fullname: string = '';
    password: string = '';
    email: string = '';
    cpf: string = '';

    constructor(init: Partial<User>) {
        Object.assign(this, init);
    }
}
