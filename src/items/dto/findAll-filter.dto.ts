export class FindAllFilterDto {
    // Filter by if the item is available or not
    // (true = only available, false = only unavailable, undefined = all)
    available?: string;

    // Filter by the name of the item
    // (If not specified return all)
    name?: string;

    // Filter by the tags of the item
    // (This is an AND check! If not specified then return all)
    tags?: string[];

    // The page from which to get the data from.
    // (This is uppose to be a number)
    page?: number;

    // The amount of items to display per page
    // (Max is 100, default is 10)
    itemsPerPage?: number;
}