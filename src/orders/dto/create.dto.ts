import { ShippingType, PaymentType } from '../enums';

export class CreateDto {
    items: string[];
    shippingType: ShippingType;
    paymentType: PaymentType;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryCountry: string;
}