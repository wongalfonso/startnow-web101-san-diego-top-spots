const server = require("./app.js");

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});