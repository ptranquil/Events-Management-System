# Events NL

This is a simple Node.js and Express application that provides CRUD (Create, Read, Update, Delete) operations for managing events.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/events-api.git
cd events-api
```

2. Install the dependencies
3. Give the DB url, provide url for the localhost or any atlas connection and provide port no
4. start using npm start
5. Install the postman collection, plug and play
6. If facing DB connection issue, double check the path of the DB provided with proper DB name

```bash
Changes as required
```

# Top Level List

```
const multipleEventSchema: ZodArray<typeof eventSchema> = array(eventSchema).min(1)
```

created an multipleEventSchema with array of events and in the validator function of zod change the type of argument to any to handle both Zodobject and ZodArray to work simultaneously

# Unique Event Name

In the controller added the validation by storing all the events inside an array and checking the existence of the event using $in operator and if found then reverting as duplicate
As EventId was also unique field added the same validation for event Id

# Save at once

To reduce the multiple query using map function
made used of `insertMany()` funciton to insert all the events at once after top level validation
