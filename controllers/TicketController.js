const Tmodel = require("../models/TicketModel");
const EModel = require("../models/EventModel");
const ttModel = require("../models/TicketTypeModel");

// não utilizado
exports.listAll = async (req, res) => {
  if (!req.admin) {
    return res.status(403).render("error", {
      code: 403,
      message: "area restrita para administradores",
    });
  }
  try {
    let ticketList = await Tmodel.list();
    return res.status(200).json(ticketList);
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao buscar os tickets",
    });
    // .json({ message: "houve um erro na busca dos tickets", error: err.message,});
  }
};

exports.getAllFromUser = async (req, res) => {
  const user = req.params.userID;

  try {
    let userTickets = await Tmodel.getTicketsOfCustomer(user);
    // return res.status(200).json(userTickets);
    if (user == req.id)
      return res.status(200).render("myTickets", { data: userTickets });
    else return res.status(403).json({ error: "id não compatível" });
  } catch (err) {
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao buscar os tickets",
    });
  }
};

//não utilizado
exports.getAllFromEvent = async (req, res) => {
  const eventID = req.params.eventID;
  try {
    let eventTickets = await Tmodel.getTicketsFromEvent(eventID);
    return res.status(200).json(eventTickets);
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao buscar os tickets",
    });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Tmodel.getTicket(req.params.id);
    console.log(ticket);
    if (!ticket) {
      return res.status(404).render("error", {
        code: 404,
        message: "ticket não encontrado",
      });
    }
    return res.status(200).render("detailPage", { data: ticket, ticket: true });
  } catch (err) {
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao buscar o ticket",
    });
  }
};

exports.addTicket = async (req, res) => {
  const ticket = req.body;
  const type = await ttModel.getTypeByid(req.params.typeId);
  if (!type)
    return res.status(404).render("error", {
      code: 404,
      message: "A categoria de bilhete procurada não pôde ser encontrada",
    });
  console.log("tipo: " + type);

  if (Number(ticket.qty) > Number(type.vacancies))
    return res.status(400).render("error", {
      code: 400,
      message: "a quantidade requerida é maior que a quantidade disponível",
    });

  const event = await EModel.getEventById(type.eventID);
  ticket.eventID = event._id;
  ticket.customerID = req.id;
  ticket.EventName = event.EventName;
  ticket.EventDate = event.EventDate;
  ticket.EventAddress = event.EventAddress;
  ticket.type = type.typeName;
  ticket.price = type.price;

  console.log("ticket: " + ticket);
  try {
    for (let i = 0; i < Number(ticket.qty); i++) {
      await Tmodel.save(
        ticket.eventID,
        ticket.customerID,
        ticket.EventName,
        ticket.EventDate,
        ticket.EventAddress,
        ticket.type,
        ticket.price
      );
      type.vacancies = Number(type.vacancies) - 1;
    }

    ttModel.update(req.params.typeId, type);

    return res.status(200).render("success", { bilhete: true });
    // json(novoTicket);
  } catch (error) {
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao criar o ingresso",
    });
  }
};

exports.editTicket = async (req, res) => {
  let ticketId = req.params.id;
  let editedInfo = req.body;

  try {
    let editedTicket = Tmodel.update(ticketId, editedInfo);
    return res.status(200).json(editedTicket);
  } catch (err) {
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao atualizar o ingresso",
    });
  }
};

exports.deleteTicket = async (req, res) => {
  const id = req.body.id;
  try {
    let removed = await Tmodel.delete(id);
    return res
      .status(200)
      .json({ message: "ticket removido", ticket: removed });
  } catch (err) {
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao remover o ingresso",
    });
  }
};
