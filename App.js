const Express = require("express");
const port = 3000;

const app = Express();
const userRoutes = require("./routes/UserRoutes");
app.use(require("./config/dbConnect"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("pagina inicial do projeto 2");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
