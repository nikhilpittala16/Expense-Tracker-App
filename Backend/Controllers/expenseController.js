const Expense = require("./../Models/expenseModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
exports.getExpenses = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let query = Expense.find({ user: decoded.id });
    query = query.sort(req.query.sort);
    const expenses = await query;
    res.status(200).json({
      status: "success",
      data: expenses,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createExpense = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const newExpense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      date: req.body.date,
      user: decoded.id,
    });
    res.status(200).json({
      status: "success",
      data: {
        expense: newExpense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
