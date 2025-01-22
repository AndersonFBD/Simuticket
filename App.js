const Express = require("express");
const port = 3000;

const app = Express();

//importação de rotas
const userRoutes = require("./routes/UserRoutes");
const eventRoutes = require("./routes/EventRoutes");
const ticketRoutes = require("./routes/TicketRoutes");

//utilitários
app.use(require("./config/dbConnect"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("pagina inicial do projeto 2");
});

//invocação das rotas
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
