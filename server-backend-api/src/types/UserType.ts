

export enum DBUserRoles {
    ADMIN = 'admin',
    CLIENT = 'client',
}

export enum UserRoles {
    ADMIN = DBUserRoles.ADMIN,
    CLIENT = DBUserRoles.CLIENT,
    GUEST = ' guest' // virtual user role
}


export const UserRolesGuest : string = 'guest';

export interface UserInterface {
    id: number,
    role: DBUserRoles.CLIENT | DBUserRoles.ADMIN,
    username: string,
    email: string,
    password: string,
    phone?: string,
    
}

export type UserType = UserInterface;
