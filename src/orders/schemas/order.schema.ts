import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

import { Item } from 'src/items/schemas/item.schema';
import { User } from 'src/users/schemas/user.schema';
import { ShippingType, PaymentType } from '../enums';

@Schema()
export class Order {
    // If there is no owner the person who made the order
    // decided to not create an account or login to their account
    // TODO: Maybe implement this in the future?
    /*@Prop({ required: false, type: MongoSchema.Types.ObjectId, ref: 'User' })
    owner?: User | null;*/

    @Prop({ required: true })
    shippingType: ShippingType;

    @Prop({ required: true })
    paymentType: PaymentType;

    @Prop({ required: true })
    deliveryAddress: string;

    @Prop({ required: true })
    deliveryCity: string;

    @Prop({ required: true })
    deliveryCountry: string;

    @Prop({ required: true, type: [{type: MongoSchema.Types.ObjectId, ref: 'Item'}] })
    items: Item[];
}
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);