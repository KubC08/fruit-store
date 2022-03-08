import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item {
    @Prop({ required: true, index: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    availableCount: number;

    @Prop({ type: [String], required: true })
    tags: string[];

    @Prop({ required: true })
    price: number;
}
export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({ name: 'text' }, { unique: false });