const checkAuth = `
  SELECT user_id, username, role, password                                                                                                                                       FROM users WHERE username = $1;
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
