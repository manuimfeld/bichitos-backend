const getAllSales = `
  SELECT * FROM sales;
`;

const getSalesToday = `SELECT * FROM sales WHERE DATE_TRUNC('day', sale_date) = CURRENT_DATE`;

const getSalesByDay = `SELECT * FROM sales WHERE sale_date >= $1 AND sale_date <= $2`;

const getSaleById = `
  SELECT * FROM sales WHERE sale_id = $1;
`;

const createSale = `
  INSERT INTO sales (payment_method_id, amount, customer_dni, sale_date, created_by, turn)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

const updateSale = `
  UPDATE sales
  SET payment_method_id = $1, amount = $2, turn = $3, sale_date = $4
  WHERE sale_id = $5
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
