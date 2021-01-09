import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CalendarEventsService } from './calendarEvents.service';
import { AddCalendarEventDto } from './dto/add-calendar-event.dto';
import { CalendarEvent } from './schemas/calendarEvent.schema';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('calendarEvents')
export class CalendarEventsController {
    constructor(private readonly calendarEventsService: CalendarEventsService) { };

    @Get()
    async getCalendarEventList(@Res() res): Promise<CalendarEvent[]> {

        const calendarEventList = await this.calendarEventsService.getCalendarEventList();

        if (res.statusCode === HttpStatus.OK) {
            return res.status(HttpStatus.OK).json(calendarEventList);
        }
    }

    @Get(':id')
    async getCalendarEventById(@Res() res, @Param('id') id: string) {
        const calendarEventFound = await this.calendarEventsService.getCalendarEventById(id);
        if (!calendarEventFound) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(calendarEventFound);
    };

    @Patch(':id')
    updateCalendarEvent(@Res() res, @Param('id') id: string, @Body() calendarEventUpdated: CalendarEvent) {
        this.calendarEventsService.updateCalendarEvent(id, calendarEventUpdated);
        return res.status(HttpStatus.OK).json({
            message: "UPDATED has been added successfully CalendarEvent",
        });
    };

    @Post()
    async addCalendarEvent(@Res() res, @Body() addCalendarEventDto: AddCalendarEventDto) {
        const calendarEventAdded = await this.calendarEventsService.addCalendarEvent(addCalendarEventDto);
        return res.status(HttpStatus.OK).json({
            message: "Post has been added successfully CalendarEvent",
            addedCalendarEvent: 1,
            calendarEventAdded
        });
    }

    @Delete(':id')
    deleteCalendarEvent(@Res() res, @Param('id') id: string) {
        try {
            if (res.statusCode === HttpStatus.OK) {
                this.calendarEventsService.deleteCalendarEvent(id);
                return res.status(HttpStatus.OK).json({
                    message: "Delete has been added successfully CalendarEvent"
                });
            }
        } catch (error) {
            throw new Error('totoottootot');
        }

    };
};
