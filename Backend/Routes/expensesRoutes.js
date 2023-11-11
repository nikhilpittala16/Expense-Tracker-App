const express = require("express");
const expenseController = require("./../Controllers/expenseController");
const authController = require("./../Controllers/authController");
const router = express.Router();
router
  .route("/")
  .get(authController.protect, expenseController.getExpenses)
  .post(authController.protect, expenseController.createExpense);
router
  .route("/:id")
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
