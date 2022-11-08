export class FullUser {
    id: number = 0;
    fullName: string = '';
    username: string = '';
    password: string = '';
    email: string = '';

    constructor(init: Partial<FullUser>) {
        Object.assign(this, init);
    }
}
