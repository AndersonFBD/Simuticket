const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  eventID: String,
  typeName: String,
  price: Number,
  vacancies: Number,
});

const ttModel = mongoose.model("Ticket_Type", EventSchema);

module.exports = {
  listFromEvent: async (eventID) => {
    const TicketTypes = await ttModel.find({ eventID: eventID }).lean();
    return TicketTypes;
  },
  save: async (eventID, typeName, price, vacancies) => {
    const newTType = new EventModel({
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
  subtract: async (typeID, qty) => {
    let type = await ttModel.findById(typeID);
    if (!type) return null;
    if (Number(type.vacancies) - Number(qty) < 0) return false;
    type.vacancies = Number(type.vacancies) - Number(qty);
    await type.save();
    return true;
  },
  delete: async (id) => {
    return await ttModel.findByIdAndDelete(id);
  },
};
