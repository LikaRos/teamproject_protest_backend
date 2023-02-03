require("dotenv").config();
const passport = require("passport");
require("./controllers/user-google-auth/passportConfig")(passport);

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const questionsRouter = require("./routes/api/questions");
// const googleAuthRouter = require("./routes/api/googleAuth");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// app.use("/api/googleAuth", googleAuthRouter);
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter);
app.set("json space", 8);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
	res.status(200).json({ message: "Express on Vercel" });
 });
 

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
