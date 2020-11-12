import { User } from './user';

export class UserParams {
    gender: string;
    minAge = 16;
    maxAge = 115;
    pageNumber = 1;
    pageSize = 5;

    constructor(user: User) {
        this.gender = user.gender === 'employer' ? 'employee' : 'employer';
    }

}
