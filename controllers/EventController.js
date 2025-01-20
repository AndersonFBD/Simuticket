const eModel = require("../models/EventModel");

exports.createEvent = async (req, res) => {
  const { EventName, EventDescription, EventAddress, EventDate } = req.body;

  try {
    let event = await eModel.save(
      EventName,
      EventDescription,
      EventAddress,
      EventDate
    );
    return res.status(201).json({ message: "Evento adicionado", event: event });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro ao adicionar evento", error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    let event = await eModel.getEventById(req.params.id);
    if ((event.length = 0))
      return res.status(404).json({ message: "evento não encontrado" });
    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro na busca do evento", error: error.message });
  }
};

exports.listEvents = async (req, res) => {
  try {
    let eventList = await eModel.list();
    return res.status(200).json(eventList);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro ao buscar os eventos", error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    let eventId = req.params.id;
    let alteredEvent = req.body.event;
    let updatedEvent = await eModel.update(eventId, alteredEvent);
    return res.status(200).json({ message: "evento atualizado", updatedEvent });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro na atualização do evento", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    let eventId = req.body.eventId;
    let deletedEvent = await eModel.delete(eventId);
    return res.status(200).json({ message: "evento removido", deletedEvent });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "houve um erro na remoção do evento",
        error: error.message,
      });
  }
};
