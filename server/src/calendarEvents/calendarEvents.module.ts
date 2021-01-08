import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarEventsController } from './calendarEvents.controller';
import { CalendarEventsService } from './calendarEvents.service';
import { CalendarEvent, CalendarEventSchema } from './schemas/calendarEvent.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: CalendarEvent.name, schema: CalendarEventSchema }])],
    controllers: [CalendarEventsController],
    providers: [CalendarEventsService]
})
export class CalendarEventsModule { }
