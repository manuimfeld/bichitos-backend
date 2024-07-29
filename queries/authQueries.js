const checkAuth = `
  SELECT * FROM users WHERE username = $1, password = $2;
`;

const createUser = `
  INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING *;
`;

module.exports = {
  checkAuth,
  createUser,
};
