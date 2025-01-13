const Express = require("express");
const port = 3000;

const app = Express();

app.get("/", (req, res) => {
  res.end("pagina inicial do projeto 2");
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
