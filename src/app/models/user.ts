export class User {
    id: number = 0;
    fullName: string = '';
    username: string = '';
    email: string = '';

    constructor(init: Partial<User>) {
        Object.assign(this, init);
    }
}
