const getAllSales = `
  SELECT * FROM sales;
`;

const getSalesToday = `SELECT
    s.sale_id,
    pm.method_name AS payment_method,
    s.amount,
    s.customer_dni,
    s.sale_date,
    s.created_by,
    t.name AS turn
  FROM sales s
  JOIN payment_methods pm ON s.payment_method_id = pm.payment_id
  JOIN turns t ON s.turn = t.id
  WHERE DATE_TRUNC('day', s.sale_date) = CURRENT_DATE`;

const getSalesByDay = `SELECT * FROM sales WHERE sale_date >= $1 AND sale_date <= $2`;

const getSaleById = `
  SELECT * FROM sales WHERE sale_id = $1;
`;

const getTotalSalesMonth = `
   SELECT 
    SUM(amount) AS total_sales,
    COUNT(*) AS total_sales_count
  FROM 
    sales
  WHERE 
    DATE_TRUNC('month', sale_date) = DATE_TRUNC('month', CURRENT_DATE);
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
  getTotalSalesMonth,
  createSale,
  updateSale,
  deleteSale,
};
