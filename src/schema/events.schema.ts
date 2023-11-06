import { object, string, date } from 'zod';

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
});