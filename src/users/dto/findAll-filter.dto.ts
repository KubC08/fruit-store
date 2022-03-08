import { Role } from 'src/roles';

export class FindAllFilterDto {
    // Search by username
    username?: string;

    // Filter by roles
    roles?: Role[];

    // The page from which to get the data from.
    // (This is uppose to be a number)
    page?: number;

    // The amount of items to display per page
    // (Max is 100, default is 10)
    itemsPerPage?: number;
}