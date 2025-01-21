const Tmodel = require("../models/TicketModel");

exports.listAll = async (req, res) => {
  try {
    let ticketList = await Tmodel.list();
    return res.status(200).json(ticketList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "houve um erro na busca dos tickets",
      error: err.message,
    });
  }
};

exports.getAllFromUser = async (req, res) => {
  const user = req.params.user;

  try {
    let userTickets = await Tmodel.getTicketsOfCustomer(user);
    return res.status(200).json(userTickets);
  } catch (err) {
    return res.status(500).json({
      message: "houve um erro na busca dos tickets",
      error: err.message,
    });
  }
};

exports.addTicket = async (req, res) => {
  const ticket = req.body;

  try {
    let novoTicket = await Tmodel.save(ticket);
    return res.status(200).json(novoTicket);
  } catch (error) {
    return res.status(500).json({
      message: "houve um erro na criação do bilhete",
      error: err.message,
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
    return res.status(500).json({
      message: "houve um erro na atualização do bilhete",
      error: err.message,
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
    return res.status(500).json({
      message: "houve um erro na exclusão do ticket",
      error: err.message,
    });
  }
};
