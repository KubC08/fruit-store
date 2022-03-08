import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Role } from 'src/roles/role.enum';

@Schema()
export class User {
    @Prop({ required: true, index: true })
    username: string;

    @Prop({ required: true, index: true })
    email: string;

    @Prop({ required: true })
    password?: string;

    @Prop({ required: true })
    roles: Role[]; // Would be better to use permissions + groups instead but would take too long
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 'text' }, { unique: true });