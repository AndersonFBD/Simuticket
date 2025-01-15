const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  EventName: String,
  TotalSeat: Number,
  AvailableSeat: Number,
  EventDate: Date,
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = {
  list: async () => {
    const EventList = await EventModel.find({});
    return EventList;
  },
  save: async (EventName, TotalSeat, AvailableSeat, EventDate) => {
    const newEvent = new TicketModel({
      EventName: EventName,
      TotalSeat: TotalSeat,
      AvailableSeat: AvailableSeat,
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
  getTicket: async (id) => {
    return await EventModel.findById(id);
  },
};
