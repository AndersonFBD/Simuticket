const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  EventName: String,
  EventDescription: String,
  EventAddress: String,
  EventDate: Date,
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = {
  list: async () => {
    const EventList = await EventModel.find({});
    return EventList;
  },
  save: async (EventName, EventDescription, EventAddress, EventDate) => {
    const newEvent = new EventModel({
      EventName: EventName,
      EventDescription: EventDescription,
      EventAddress: EventAddress,
      EventDate: EventDate,
    });
    await newEvent.save();
    return newEvent;
  },
  update: async (id, editedEvent) => {
    let foundEvent = await EventModel.findById(id);
    console.log(foundEvent);
    if (!foundEvent) return false;
    console.log(editedEvent);
    Object.keys(editedEvent).forEach(
      (key) => (foundEvent[key] = editedEvent[key])
    );
    await foundEvent.save();
    return foundEvent;
  },
  delete: async (id) => {
    return await EventModel.findByIdAndDelete(id);
  },
  getEventById: async (id) => {
    return await EventModel.findById(id);
  },
};
