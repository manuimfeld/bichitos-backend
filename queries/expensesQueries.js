const getAllExpenses = `
  SELECT * FROM expenses
`;

const createExpense = `INSERT INTO expenses (expenses_date, provider_id, expenses_type, amount, is_paid)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

module.exports = {
  getAllExpenses,
  createExpense,
};
