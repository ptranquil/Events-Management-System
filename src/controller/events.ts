import { Request, Response } from 'express';
import { EventModel, Event } from '../model/events.db';
import _, { isEmpty } from "lodash"

export const createEvents = async (req: Request, res: Response) => {
    try {
        const reqData: Event = req.body;
        const isEventExist = await EventModel.findOne({
            $or: [
                { id: reqData.id }, { name: reqData.eventName }
            ]
        })
        if (isEventExist) {
            return res.status(400).json({ status: false, message: `Event with Id ${reqData.id} or Name ${reqData.eventName} already Exist` })
        }
        const newEvent = new EventModel({ ...reqData, isActive: true });
        const savedEvent = await newEvent.save();
        return res.status(201).json({ status: true, message: "events created successfully", data: savedEvent })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId: string = req.params.id;
        const event = await EventModel.findOne({ id: eventId, isActive: true });
        if (_.isEmpty(event)) {
            return res.status(404).json({ status: false, message: 'Event not found' })
        }
        return res.status(200).json({ status: true, message: "events fetched successfully", data: event })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const eventId: string = req.params.id;
        const eventData: Event = req.body;
        const event = await EventModel.findOne({ id: eventId, isActive: true });
        if (!event) {
            return res.status(404).json({ status: false, message: 'Event not found' })
        }
        const update = {
            $set: {
                ...eventData
            },
        };
        const updatedEvent = await EventModel.updateOne({ id: eventId }, update);
        if (!updatedEvent) {
            return res.status(404).json({ status: false, message: 'Event not found' })
        }
        return res.status(200).json({ status: true, message: "events updated successfully", data: updatedEvent })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId: string = req.params.id;
        const event = await EventModel.findOne({ id: eventId, isActive: true });
        if (!event) {
            return res.status(404).json({ status: false, message: 'Event not found' })
        }
        const update = {
            $set: {
                isActive: false
            },
        };
        const deleteEvent = await EventModel.updateOne({ id: eventId }, update);
        if (!deleteEvent) {
            return res.status(404).json({ status: false, message: 'Event not found' })
        }
        return res.status(204).end()
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
};

export const getEventByOption = async (req: Request, res: Response) => {
    try {
        const { city, state, organizer } = req.query;
        const filter: any = {};
        if (organizer) filter['organizer'] = organizer;
        if (city) filter['location.city'] = city;
        if (state) filter['location.state'] = state;
        const events = await EventModel.find({ ...filter, isActive: true })
        console.log(events)
        return res.status(200).json({ status: true, message: "events fetched successfully", data: events })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
};

export const addMultipleEvents = async (req: Request, res: Response) => {
    try {
        const events: [Event] = req.body;

        /** fetching all the eventName and storing it in an array */
        let eventsName: string[] = [];
        let ids: string[] = [];
        events.map(async (tempEvent: Event) => {
            eventsName.push(tempEvent.eventName)
            ids.push(tempEvent.id)
        })

        /** finding duplicate eventName using $in operator */
        const isEventNameDuplicate = await EventModel.find({
            eventName: {
                $in: eventsName
            }
        })
        const isEventIdsDuplicate = await EventModel.find({
            id: {
                $in: ids
            }
        })
        let errMessage = ''
        if (isEventIdsDuplicate.length) {
            errMessage = `Duplicate Event Id : ${isEventIdsDuplicate.map((event) => event.id).join(', ')}`;
        }
        if (isEventNameDuplicate.length) {
            errMessage = `Duplicate Event Name : ${isEventNameDuplicate.map((event) => event.eventName).join(', ')}`;
        }

        if (!isEmpty(errMessage)) {
            return res.status(409).json({ status: false, message: errMessage })
        }
        await EventModel.insertMany(events)
        return res.status(200).json({ status: true, message: "Events added succesfully" })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

