import { Role } from 'src/roles';
 
export class PatchDto {
    username?: string;
    email?: string;
    password?: string;
    roles?: Role[]
}