const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  eventID: String,
  customerID: String,
  Available: Number,
  price: Number,
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

module.exports = {
  list: async () => {
    const TicketList = await TicketModel.find({});
    return TicketList;
  },
  save: async (eventID, Available, price) => {
    const newTicket = new TicketModel({
      eventID: eventID,
      Available: Available,
      price: price,
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
    return await TicketModel.findById(id);
  },
  getTicketsOfCustomer: async (customer) => {
    return TicketModel.find({ customerID: customer });
  },
};
