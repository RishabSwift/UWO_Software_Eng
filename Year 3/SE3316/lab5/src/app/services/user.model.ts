export interface User {
    uid: string;
    email: string;
    name: string;
    activated: boolean;
    roles: Roles;
}

export interface Roles {
    guest?: boolean;
    student?: boolean;
    admin?: boolean;
}
