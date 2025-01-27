const Express = require("express");
const cookieParser = require("cookie-parser");
const port = 3000;
const app = Express();

//importação de rotas
const userRoutes = require("./routes/UserRoutes");
const eventRoutes = require("./routes/EventRoutes");
const ticketRoutes = require("./routes/TicketRoutes");
const authRoutes = require("./routes/AuthRoutes");

//utilitários
app.use(require("./config/dbConnect"));
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("pagina inicial do projeto 2");
});

//invocação das rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
