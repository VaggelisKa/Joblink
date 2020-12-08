export interface User {
    username: string;
    token: string;
    photoUrl: string;
    typeOfUser: string;
    gender?: string;
    roles: string[];
}
