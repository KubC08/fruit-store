import { Role } from '../roles/role.enum';

export interface JWTPayload {
    id: string,
    username: string,
    email: string,
    roles: Role[] // Not the most secure possibility, but better than hitting the DB too much
}