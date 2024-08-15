const getAllExpenses = `
   SELECT 
    expenses.id,
    expenses.expenses_date,
    providers.name AS provider,
    expenses.expenses_type,
    expenses.amount,
    expenses.is_paid
  FROM 
    expenses
  JOIN 
    providers ON expenses.provider_id = providers.id
`;

const createExpense = `INSERT INTO expenses (expenses_date, provider_id, expenses_type, amount, is_paid)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

module.exports = {
  getAllExpenses,
  createExpense,
};
