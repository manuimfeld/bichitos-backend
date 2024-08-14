const getAllProducts = `
  SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.price AS product_price,
    pr.name AS provider_name
FROM
    products p
LEFT JOIN
    providers pr ON p.provider_id = pr.id;
`;

const createProduct = `INSERT INTO products (name, price, provider_id)
  VALUES ($1, $2, $3)
  RETURNING *;`;

module.exports = {
  getAllProducts,
  createProduct,
};
