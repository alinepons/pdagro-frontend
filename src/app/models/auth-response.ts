export class AuthResponse {
    token: string = '';

    constructor(init: Partial<AuthResponse>) {
        Object.assign(this, init);
    }
}
