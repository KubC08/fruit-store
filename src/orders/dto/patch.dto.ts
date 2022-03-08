import { PaymentType, ShippingType } from '../enums';

export class PatchDto {
    shippingType?: ShippingType;
    paymentType?: PaymentType;
    items?: string[];
    deliveryAddress?: string;
    deliveryCity?: string;
    deliveryCountry?: string;
}