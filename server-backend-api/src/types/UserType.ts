export enum UserRoles {
    ADMIN = 'admin',
    CLIENT = 'client'
}

export interface UserInterface {
    id: number,
    role: UserRoles.CLIENT | UserRoles.ADMIN,
    username: string,
    email: string,
    password: string,
    phone?: string,
    
}

export type UserType = UserInterface;
