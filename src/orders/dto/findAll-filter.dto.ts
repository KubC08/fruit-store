import { PaymentType, ShippingType } from '../enums';

export class FindAllFilterDto {
    // Filter by shipping type
    shippingType?: ShippingType;

    // Filter by payment type
    paymentType?: PaymentType;

    // Filter by country of delivery
    deliveryCountry?: string;

    // The page from which to get the data from.
    // (This is uppose to be a number)
    page?: number;

    // The amount of items to display per page
    // (Max is 100, default is 10)
    itemsPerPage?: number;
}