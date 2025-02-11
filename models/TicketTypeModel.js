const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  eventID: String,
  typeName: String,
  price: Number,
  vacancies: Number,
});

const ttModel = mongoose.model("Ticket_Type", TypeSchema);

module.exports = {
  listFromEvent: async (eventID) => {
    const TicketTypes = await ttModel
      .find({ eventID: eventID, vacancies: { $gt: 0 } })
      .lean();
    return TicketTypes;
  },
  save: async (eventID, typeName, price, vacancies) => {
    const newTType = new ttModel({
      eventID: eventID,
      typeName: typeName,
      price: price,
      vacancies: vacancies,
    });
    await newTType.save();
    return newTType;
  },
  update: async (id, editedtype) => {
    let foundType = await ttModel.findById(id);
    if (!foundType) return false;
    Object.keys(editedtype).forEach(
      (key) => (foundType[key] = editedtype[key])
    );
    await foundType.save();
    return foundType;
  },
  delete: async (id) => {
    return await ttModel.findByIdAndDelete(id);
  },
  getTypeByid: async (id) => {
    return await ttModel.findById(id);
  },
};
