const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  eventID: String,
  customerID: String,
  EventName: String,
  EventDate: String,
  EventAddress: String,
  type: String,
  price: Number,
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

module.exports = {
  list: async () => {
    const TicketList = await TicketModel.find({});
    return TicketList;
  },
  save: async (
    eventID,
    customerID,
    EventName,
    EventDate,
    EventAddress,
    type,
    price
  ) => {
    const newTicket = new TicketModel({
      eventID: eventID,
      customerID: customerID,
      price: price,
      EventName: EventName,
      EventDate: EventDate,
      EventAddress: EventAddress,
      type: type,
    });
    await newTicket.save();
    return newTicket;
  },
  update: async (id, editedTicket) => {
    let foundTicket = await TicketModel.findById(id);
    if (!foundTicket) return false;

    Object.keys(editedTicket).forEach(
      (key) => (foundTicket[key] = editedTicket[key])
    );
    await foundTicket.save();
    return foundTicket;
  },
  delete: async (id) => {
    return await TicketModel.findByIdAndDelete(id);
  },
  getTicket: async (id) => {
    return await TicketModel.findById(id).lean();
  },
  getTicketsOfCustomer: async (customer) => {
    const tickets = await TicketModel.find({ customerID: customer }).lean();
    console.log(tickets);
    return tickets;
  },
  getTicketsFromEvent: async (event) => {
    return TicketModel.find({ EventID: event });
  },
};
