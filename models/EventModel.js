const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  EventName: String,
  EventDescription: String,
  EventAddress: String,
  EventDate: String,
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = {
  list: async () => {
    const EventList = await EventModel.find({}).lean();
    return EventList;
  },
  save: async (
    EventName,
    EventDescription,
    // Available,
    EventAddress,
    EventDate
  ) => {
    const newEvent = new EventModel({
      EventName: EventName,
      EventDescription: EventDescription,
      // Available: Available,
      EventAddress: EventAddress,
      EventDate: EventDate,
    });
    await newEvent.save();
    return newEvent;
  },
  update: async (id, editedEvent) => {
    let foundEvent = await EventModel.findById(id);
    if (!foundEvent) return false;
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
    const result = await EventModel.findById(id).lean();
    return result;
  },
};
