import { object, string, date, array, ZodArray } from 'zod';

const locationSchema = object({
    street: string(),
    city: string(),
    state: string(),
    zip: string(),
});

export const eventSchema = object({
    id: string(),
    eventName: string(),
    eventDate: string().datetime(),
    organizer: string(),
    email: string().email(),
    phone: string().min(10), // Adjust the min length as needed
    location: locationSchema,
})

export const multipleEventSchema: ZodArray<typeof eventSchema> = array(eventSchema).min(1)