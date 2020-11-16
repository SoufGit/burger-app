import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop()
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop()
    color: string;

    @Prop()
    entryDate: string;

    @Prop()
    outDate: string;

    // @Prop([String])
    // tags: string[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
