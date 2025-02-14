const TTModel = require("../models/TicketTypeModel");

exports.listFromEvent = async (req, res) => {
  if (!req.id)
    return res.status(403).render("error", {
      code: 403,
      message: "faça login para acessar essa página",
    });
  try {
    let types = await TTModel.listFromEvent(req.params.eventID);
    console.log(req.admin);
    if (types.length == 0) {
      return res.status(404).render("error", {
        code: 404,
        message: "não há ingressos disponíveis",
      });
      // .json({ message: "nenhum tipo cadastrado" });
    }
    if (req.admin)
      return res
        .status(200)
        .render("cardpage", { data: types, type: true, admin: true });
    else
      return res
        .status(200)
        .render("cardpage", { data: types, type: true, user: true });
    // .json(types);
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro com a busca dos ingressos",
    });
  }
};

exports.getType = async (req, res) => {
  try {
    const type = await TTModel.getTypeByid(req.params.typeId);
    if (!type)
      return res
        .status(404)
        .render("error", { code: 404, message: "categoria não encontrada" });
    return res.status(200).json(type);
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro com a busca da categoria",
    });
  }
};

exports.addType = async (req, res) => {
  const type = req.body;
  const event = req.params.eventID;

  if (!req.admin)
    return res.status(403).render("error", {
      code: 403,
      message: "disponível apenas para administradoes",
    });

  try {
    if (type.name == "" || type.price == "" || type.vacancies == "")
      return res
        .status(400)
        .render("error", { code: 400, message: "preencha todos os campos" });

    let newType = await TTModel.save(
      event,
      type.name,
      Number(type.price).toFixed(2),
      type.vacancies
    );

    return res.status(201).render("success", { tipo: true });
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao adicionar o tipo de ingresso ao evento",
    });
  }
};

exports.editType = async (req, res) => {
  const editedType = req.body;
  const typeID = req.params.id;

  try {
    if (
      editedType.name == "" ||
      editedType.price == "" ||
      editedType.vacancies == ""
    )
      return res
        .status(400)
        .render("error", { code: 400, message: "preencha todos os campos" });

    const type = await TTModel.update(typeID, editedType);
    if (type) return res.status(200).render("success", { typeEdit: true });
    // json({ status: "succes", altered_type: type });
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao atualizar o tipo",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    let typeId = req.params.typeId;
    let deletedtype = await TTModel.delete(typeId);
    return res.status(200).json({ message: "tipo removido", deletedtype });
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", {
      code: 500,
      message: "houve um erro ao remover o tipo de ingresso",
    });
  }
};
