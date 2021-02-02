export interface User {
    isAdmin: Boolean;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone?: string;
}