import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarEventDocument = CalendarEvent & Document;

@Schema()
export class CalendarEvent {
    @Prop()
    employeeId: string;

    @Prop()
    eventTypeId: string;

    @Prop()
    date: string;

    @Prop({ required: true })
    eventTitle: string;

    @Prop()
    start: string;

    @Prop()
    end: string;

    // @Prop([String])
    // tags: string[];
}

export const CalendarEventSchema = SchemaFactory.createForClass(CalendarEvent);
