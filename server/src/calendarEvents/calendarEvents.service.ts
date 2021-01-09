import { Connection, Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CalendarEvent, CalendarEventDocument } from './schemas/calendarEvent.schema';
import { AddCalendarEventDto } from './dto/add-calendar-event.dto';

@Injectable()
export class CalendarEventsService {
    constructor(@InjectModel(CalendarEvent.name) private calendarEventModel: Model<CalendarEventDocument>
        //@InjectConnection() private connection: Connection
    ) { }

    async getCalendarEventById(id: string): Promise<CalendarEvent> {
        const calendarEvent = await this.calendarEventModel.findById(id).exec();
        return calendarEvent;
    }

    async getCalendarEventList(): Promise<CalendarEvent[]> {
        console.log('CalendarEventCalendarEvent', CalendarEvent);
        return this.calendarEventModel.find().exec();
    }

    async updateCalendarEvent(id: string, addCalendarEventDto: AddCalendarEventDto): Promise<any> {
        return await this.calendarEventModel.findByIdAndUpdate(id, addCalendarEventDto, { new: true });
    }

    async addCalendarEvent(addCalendarEventDto: AddCalendarEventDto): Promise<CalendarEvent> {
        const addCalendarEvent = new this.calendarEventModel(addCalendarEventDto);
        return addCalendarEvent.save();
    }

    async deleteCalendarEvent(id: string): Promise<any> {
        return await this.calendarEventModel.findByIdAndDelete(id);
    }
};
