const getAllProducts = `
  SELECT * FROM products
`;

const createProduct = `INSERT INTO products (name, price, provider_id)
  VALUES ($1, $2, $3)
  RETURNING *;`;

module.exports = {
  getAllProducts,
  createProduct,
};
