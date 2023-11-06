import mongoose, { Document, Schema } from 'mongoose';

interface Location {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface Event extends Document {
    id: string;
    eventName: string;
    eventDate: Date;
    organizer: string;
    email: string;
    phone: string;
    location: Location;
    isActive: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new Schema<Event>({
    id: { type: String, required: true, unique: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    organizer: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    },
    isActive: { type: Boolean, required: true },
}, {
    versionKey: false,
    timestamps: true,
    collection: "events"

});

export const EventModel = mongoose.model<Event>('Events', eventSchema);
