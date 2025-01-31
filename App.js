const Express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { engine } = require("express-handlebars");
const path = require("path");
const jwt = require("jsonwebtoken");
const port = 3000;
const app = Express();

//importação de rotas
const userRoutes = require("./routes/UserRoutes");
const eventRoutes = require("./routes/EventRoutes");
const ticketRoutes = require("./routes/TicketRoutes");
const authRoutes = require("./routes/AuthRoutes");

//utilitários
app.use(Express.static("public"));
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(require("./config/dbConnect"));
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (req.cookies.session) {
    try {
      let data = jwt.verify(req.cookies.session, String(process.env.SECRET));
      return res.render("home", { name: data.name, id: data.id });
    } catch (error) {
      return res.render("home", { name: null, id: null });
    }
  } else return res.render("home", { name: null, id: null });
});

//invocação das rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
