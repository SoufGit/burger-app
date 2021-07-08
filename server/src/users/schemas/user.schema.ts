import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    userName: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    password: string;

    // @Prop([String])
    // tags: string[];
}

//userSchema.index({ phone: 1, email: 1 }, { unique: true, sparse: true });

export const UserSchema = SchemaFactory.createForClass(User);
