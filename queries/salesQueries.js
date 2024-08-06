const getAllSales = `
  SELECT * FROM sales;
`;

const getSalesToday = `SELECT * FROM sales WHERE DATE_TRUNC('day', sale_date) = CURRENT_DATE`;

const getSalesByDay = `SELECT * FROM sales WHERE sale_date >= $1 AND sale_date <= $2`;

const getSaleById = `
  SELECT * FROM sales WHERE sale_id = $1;
`;

const createSale = `
  INSERT INTO sales (amount, customer_dni, turn, created_by, payment_method_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const updateSale = `
  UPDATE sales
  SET amount = $1, customer_dni = $2, turn = $3, sale_date = $4, created_by = $5, payment_method_id = $6
  WHERE sale_id = $7
  RETURNING *;
`;

const deleteSale = `
  DELETE FROM sales WHERE sale_id = $1;
`;

module.exports = {
  getAllSales,
  getSalesByDay,
  getSalesToday,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
