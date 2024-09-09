export const getAllSales = `
  SELECT * FROM sales;
`;

export const getSalesToday = `SELECT
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
WHERE DATE(s.sale_date) = CURRENT_DATE
ORDER BY turn`;

export const getSalesByDay = `SELECT
    s.sale_id,
    pm.method_name AS payment_method,
    s.amount,
    s.customer_dni,
    s.sale_date,
    s.created_by,
    t.name AS turn
  FROM sales s
  JOIN payment_methods pm ON s.payment_method_id = pm.payment_id
  JOIN turns t ON s.turn = t.id WHERE sale_date >= $1 AND sale_date <= $2`;

export const getSaleById = `
  SELECT * FROM sales WHERE sale_id = $1;
`;

export const getTotalSalesMonth = `
   SELECT 
    SUM(amount) AS total_sales,
    COUNT(*) AS total_sales_count
  FROM 
    sales
  WHERE 
    DATE_TRUNC('month', sale_date) = DATE_TRUNC('month', CURRENT_DATE);
`;

export const getTotalSalesYear = `
   WITH months AS (
    SELECT
        DATE_TRUNC('month', date) AS month
    FROM
        generate_series(
            -- Fecha de inicio (1 de enero del año en curso)
            DATE_TRUNC('year', CURRENT_DATE),
            -- Fecha de fin (31 de diciembre del año en curso)
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year - 1 day',
            '1 month'
        ) AS date
)
SELECT
    m.month,
    COALESCE(COUNT(s.sale_date), 0) AS total_sales
FROM
    months m
LEFT JOIN
    sales s ON DATE_TRUNC('month', s.sale_date) = m.month
GROUP BY
    m.month
ORDER BY
    m.month;
`;

export const createSale = `
  INSERT INTO sales (payment_method_id, amount, customer_dni, sale_date, created_by, turn)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

export const updateSale = `
  UPDATE sales
  SET payment_method_id = $1, amount = $2, turn = $3, sale_date = $4
  WHERE sale_id = $5
  RETURNING *;
`;

export const deleteSale = `
  DELETE FROM sales WHERE sale_id = $1;
`;

export default {
  getAllSales,
  getSalesByDay,
  getSalesToday,
  getSaleById,
  getTotalSalesMonth,
  getTotalSalesYear,
  createSale,
  updateSale,
  deleteSale,
};
