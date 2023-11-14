import express from "express";
import { createEvents, getEventById, updateEvent, deleteEvent, getEventByOption, addMultipleEvents } from "../controller/events";
import { eventSchema, multipleEventSchema } from "../schema/events.schema";
import ValidateZod from "../validator/zod";

const router = express.Router();

router.post('/events', ValidateZod(eventSchema), createEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/', getEventByOption);
router.post('/addmultipleevents', ValidateZod(multipleEventSchema), addMultipleEvents)

export default router;
