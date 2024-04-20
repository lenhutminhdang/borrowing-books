const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiError = require("./app/api-error");

const readersRouter = require("./app/routes/reader.route");
const staffsRouter = require("./app/routes/staff.route");
const publishersRouter = require("./app/routes/publisher.route");
const booksRouter = require("./app/routes/book.route");
const borrowingHistoryRouter = require("./app/routes/borrowing-history.route");

const app = express(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to borrow books application." });
});

// READER ROUTER
app.use("/api/readers", readersRouter);

// STAFF ROUTER
app.use("/api/staffs", staffsRouter);

// PUBLISHER ROUTER
app.use("/api/publishers", publishersRouter);

// BOOK ROUTER
app.use("/api/books", booksRouter);

// BORROWING HISTORY ROUTER
app.use("/api/history", borrowingHistoryRouter);

// Error Handler
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal sever error",
  });
});

module.exports = app;
