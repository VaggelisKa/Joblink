import { User } from './user';

export class UserParams {
    typeOfUser: string;
    minAge = 16;
    maxAge = 115;
    pageNumber = 1;
    pageSize = 5;

    constructor(user: User) {
        this.typeOfUser = user.typeOfUser === 'employer' ? 'employee' : 'employer';
    }

}
