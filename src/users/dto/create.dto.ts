import { Role } from 'src/roles';

export class CreateDto {
    username: string;
    email: string;
    password: string;
    roles: Role[];
}