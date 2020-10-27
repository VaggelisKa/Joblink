import { Photo } from './photo';

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    bio: string;
    lookingFor: string;
    skills: string;
    city: string;
    photos: Photo[];
  }
