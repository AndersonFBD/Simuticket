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
    return res.status(201).render("success", { evento: true });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao adicionar o evento",
    });
    // .json({ message: "erro ao adicionar evento", error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    let event = await eModel.getEventById(req.params.id);
    if ((event.length = 0))
      return res.status(404).render("error", {
        code: 404,
        message: "evento não encontrado",
      });
    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro com a busca do evento",
    });
  }
};

exports.listEvents = async (req, res) => {
  try {
    let eventList = await eModel.list();
    return res.status(200).json(eventList);
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao buscar os eventos",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    let eventId = req.params.id;
    let alteredEvent = req.body;
    let updatedEvent = await eModel.update(eventId, alteredEvent);
    return res.status(200).json({ message: "evento atualizado", updatedEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao atualizar o evento",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    let eventId = req.body.eventId;
    let deletedEvent = await eModel.delete(eventId);
    return res.status(200).json({ message: "evento removido", deletedEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao remover o evento",
    });
  }
};
